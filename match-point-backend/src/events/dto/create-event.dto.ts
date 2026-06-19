export class CreateEventDto {
  esporte: string;
  local: string;
  data: string;
  horario: string;
  maxJogadores?: number;
  descricao?: string;
  creatorId?: string;
}