import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  esporte: string;

  @IsString()
  local: string;

  @IsString()
  data: string;

  @IsString()
  horario: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxJogadores?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  creatorId?: string;
}