import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [EventsModule, UsersModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}