import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [PrismaModule, EventsModule, UsersModule, AuthModule, ParticipantsModule],
  controllers: [AppController],
})
export class AppModule {}
