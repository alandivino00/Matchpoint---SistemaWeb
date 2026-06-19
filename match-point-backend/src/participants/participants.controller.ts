import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('events/:eventId/participants')
export class ParticipantsController {
  constructor(private readonly participants: ParticipantsService) {}

  @Get()
  list(@Param('eventId') eventId: string) {
    return this.participants.listForEvent(eventId);
  }

  @Post()
  confirm(@Param('eventId') eventId: string, @Body() body: { userId: string }) {
    return this.participants.confirm(eventId, body.userId);
  }

  @Delete()
  cancel(@Param('eventId') eventId: string, @Body() body: { userId: string }) {
    return this.participants.cancel(eventId, body.userId);
  }
}