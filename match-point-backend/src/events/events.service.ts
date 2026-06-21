import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return event;
  }

  create(payload: {
    esporte: string;
    local: string;
    data: string;
    horario: string;
    maxJogadores?: number;
    descricao?: string;
    creatorId?: string;
  }) {
    return this.prisma.event.create({
      data: {
        esporte: payload.esporte,
        local: payload.local,
        data: payload.data,
        horario: payload.horario,
        maxJogadores: payload.maxJogadores ?? 20,
        descricao: payload.descricao,
        creatorId: payload.creatorId,
      },
    });
  }

  async update(
    id: string,
    payload: {
      esporte?: string;
      local?: string;
      data?: string;
      horario?: string;
      maxJogadores?: number;
      descricao?: string;
    },
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return this.prisma.event.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return { success: true };
  }

  async incrementConfirm(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (event.confirmados >= event.maxJogadores) {
      return event;
    }

    const confirmados = event.confirmados + 1;
    const indice = Math.round((confirmados / event.maxJogadores) * 100);

    return this.prisma.event.update({
      where: { id },
      data: { confirmados, indice },
    });
  }

  async decrementConfirm(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (event.confirmados <= 0) {
      return event;
    }

    const confirmados = event.confirmados - 1;
    const indice = Math.round((confirmados / event.maxJogadores) * 100);

    return this.prisma.event.update({
      where: { id },
      data: { confirmados, indice },
    });
  }
}