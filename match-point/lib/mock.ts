import { EventItem } from "@/types/event";

export const eventsMock: EventItem[] = [
  {
    id: "1",
    esporte: "FUTSAL",
    local: "Quadra 1",
    data: "09/05/2026",
    horario: "09:00",
    confirmados: 12,
    maxJogadores: 20,
    indice: 78,
    descricao: "Treino aberto para todos.",
  },
  {
    id: "2",
    esporte: "VÔLEI",
    local: "Quadra 2",
    data: "09/05/2026",
    horario: "14:00",
    confirmados: 8,
    maxJogadores: 12,
    indice: 60,
    descricao: "Treino para níveis intermediários.",
  },
  {
    id: "3",
    esporte: "BASQUETE",
    local: "Quadra 3",
    data: "09/05/2026",
    horario: "17:00",
    confirmados: 10,
    maxJogadores: 20,
    indice: 32,
    descricao: "Partida recreativa.",
  },
];

export const myCreatedEvents = eventsMock;
export const myConfirmedEvents = eventsMock.slice(0, 2);