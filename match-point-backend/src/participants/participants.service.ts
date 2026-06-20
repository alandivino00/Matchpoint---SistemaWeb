import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsService } from '../events/events.service';

@Injectable()
export class ParticipantsService {
  private participants: Record<string, string[]> = {};

  constructor(private readonly eventsService: EventsService) {}

  confirm(eventId: string, userId: string) {
    const event = this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Evento não encontrado');

    this.participants[eventId] = this.participants[eventId] || [];

    if (!this.participants[eventId].includes(userId)) {
      this.participants[eventId].push(userId);
      this.eventsService.incrementConfirm(eventId);
    }

    return { eventId, userId };
  }

  cancel(eventId: string, userId: string) {
    const event = this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Evento não encontrado');

    const list = this.participants[eventId] || [];
    this.participants[eventId] = list.filter((u) => u !== userId);
    this.eventsService.decrementConfirm(eventId);

    return { eventId, userId };
  }

  listForEvent(eventId: string) {
    return this.participants[eventId] || [];
  }
}