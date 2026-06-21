import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(
    @Body()
    payload: {
      esporte: string;
      local: string;
      data: string;
      horario: string;
      maxJogadores?: number;
      descricao?: string;
      creatorId?: string;
    },
  ) {
    return this.eventsService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    payload: {
      esporte?: string;
      local?: string;
      data?: string;
      horario?: string;
      maxJogadores?: number;
      descricao?: string;
    },
  ) {
    return this.eventsService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}