import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
  ) {}

  async confirm(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    const existing = await this.prisma.participant.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (existing) {
      return { eventId, userId };
    }

    await this.prisma.participant.create({
      data: {
        userId,
        eventId,
      },
    });

    await this.eventsService.incrementConfirm(eventId);

    return { eventId, userId };
  }

  async cancel(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    await this.prisma.participant.deleteMany({
      where: {
        userId,
        eventId,
      },
    });

    await this.eventsService.decrementConfirm(eventId);

    return { eventId, userId };
  }

  async listForEvent(eventId: string) {
    return this.prisma.participant.findMany({
      where: { eventId },
      include: {
        user: true,
      },
    });
  }
}