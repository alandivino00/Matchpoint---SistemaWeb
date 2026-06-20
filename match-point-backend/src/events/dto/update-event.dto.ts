import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  esporte?: string;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @IsString()
  horario?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxJogadores?: number;

  @IsOptional()
  @IsString()
  descricao?: string;
}