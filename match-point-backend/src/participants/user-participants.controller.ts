import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('users/:userId/events')
export class UserParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  listByUser(@Param('userId') userId: string) {
    return this.participantsService.listByUser(userId);
  }
}