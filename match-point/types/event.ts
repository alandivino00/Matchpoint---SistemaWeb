export type EventItem = {
  id: string;
  esporte: string;
  local: string;
  data: string;
  horario: string;
  confirmados: number;
  maxJogadores: number;
  indice: number;
  descricao?: string;
};