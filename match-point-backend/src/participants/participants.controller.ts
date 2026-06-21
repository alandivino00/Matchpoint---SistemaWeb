import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('events/:eventId/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  list(@Param('eventId') eventId: string) {
    return this.participantsService.listForEvent(eventId);
  }

  @Post()
  confirm(@Param('eventId') eventId: string, @Body() body: { userId: string }) {
    return this.participantsService.confirm(eventId, body.userId);
  }

  @Delete()
  cancel(@Param('eventId') eventId: string, @Body() body: { userId: string }) {
    return this.participantsService.cancel(eventId, body.userId);
  }
}