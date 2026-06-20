import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ConfirmParticipantDto } from './dto/confirm-participant.dto';

@Controller('events/:eventId/participants')
export class ParticipantsController {
  constructor(private readonly participants: ParticipantsService) {}

  @Get()
  list(@Param('eventId') eventId: string) {
    return {
      success: true,
      message: 'Participantes listados com sucesso',
      data: this.participants.listForEvent(eventId),
    };
  }

  @Post()
  confirm(
    @Param('eventId') eventId: string,
    @Body() body: ConfirmParticipantDto,
  ) {
    return {
      success: true,
      message: 'Presença confirmada com sucesso',
      data: this.participants.confirm(eventId, body.userId),
    };
  }

  @Delete()
  cancel(
    @Param('eventId') eventId: string,
    @Body() body: ConfirmParticipantDto,
  ) {
    return {
      success: true,
      message: 'Presença cancelada com sucesso',
      data: this.participants.cancel(eventId, body.userId),
    };
  }
}