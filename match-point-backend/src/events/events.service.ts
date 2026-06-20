import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

export type EventItem = {
  id: string;
  esporte: string;
  local: string;
  data: string;
  horario: string;
  maxJogadores: number;
  confirmados: number;
  indice: number;
  descricao?: string;
  creatorId?: string;
};

@Injectable()
export class EventsService {
  private events: EventItem[] = [
    {
      id: '1',
      esporte: 'FUTSAL',
      local: 'Quadra 1',
      data: '09/05/2026',
      horario: '09:00',
      maxJogadores: 20,
      confirmados: 12,
      indice: 78,
      descricao: 'Treino aberto para todos.',
      creatorId: 'u1',
    },
    {
      id: '2',
      esporte: 'VÔLEI',
      local: 'Quadra 2',
      data: '09/05/2026',
      horario: '14:00',
      maxJogadores: 12,
      confirmados: 8,
      indice: 60,
      descricao: 'Treino para níveis intermediários.',
      creatorId: 'u2',
    },
  ];

  findAll(): EventItem[] {
    return this.events;
  }

  findOne(id: string): EventItem | undefined {
    return this.events.find((e) => e.id === id);
  }

  create(payload: CreateEventDto): EventItem {
    const maxJogadores = payload.maxJogadores ?? 20;

    const newEvent: EventItem = {
      id: uuidv4(),
      esporte: payload.esporte,
      local: payload.local,
      data: payload.data,
      horario: payload.horario,
      maxJogadores,
      confirmados: 0,
      indice: 0,
      descricao: payload.descricao,
      creatorId: payload.creatorId,
    };

    this.events.push(newEvent);
    return newEvent;
  }

  update(id: string, payload: UpdateEventDto): EventItem | undefined {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;

    this.events[idx] = { ...this.events[idx], ...payload };
    return this.events[idx];
  }

  remove(id: string): { success: boolean } {
    this.events = this.events.filter((e) => e.id !== id);
    return { success: true };
  }

  incrementConfirm(id: string): EventItem | undefined {
    const ev = this.findOne(id);
    if (!ev) return undefined;

    if (ev.confirmados < ev.maxJogadores) {
      ev.confirmados += 1;
      ev.indice = Math.round((ev.confirmados / ev.maxJogadores) * 100);
    }

    return ev;
  }

  decrementConfirm(id: string): EventItem | undefined {
    const ev = this.findOne(id);
    if (!ev) return undefined;

    if (ev.confirmados > 0) {
      ev.confirmados -= 1;
      ev.indice = Math.round((ev.confirmados / ev.maxJogadores) * 100);
    }

    return ev;
  }
}