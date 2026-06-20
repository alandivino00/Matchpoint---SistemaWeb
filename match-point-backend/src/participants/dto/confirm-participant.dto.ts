import { IsString } from 'class-validator';

export class ConfirmParticipantDto {
  @IsString()
  userId: string;
}