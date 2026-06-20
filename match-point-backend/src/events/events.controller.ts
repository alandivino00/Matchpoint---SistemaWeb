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
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    const data = this.eventsService.findAll();
    return {
      success: true,
      message: 'Eventos listados com sucesso',
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const event = this.eventsService.findOne(id);
    if (!event) throw new NotFoundException('Evento não encontrado');

    return {
      success: true,
      message: 'Evento encontrado com sucesso',
      data: event,
    };
  }

  @Post()
  create(@Body() payload: CreateEventDto) {
    const data = this.eventsService.create(payload);
    return {
      success: true,
      message: 'Evento criado com sucesso',
      data,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateEventDto) {
    const data = this.eventsService.update(id, payload);
    if (!data) throw new NotFoundException('Evento não encontrado');

    return {
      success: true,
      message: 'Evento atualizado com sucesso',
      data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const removed = this.eventsService.remove(id);
    return {
      success: true,
      message: 'Evento removido com sucesso',
      data: removed,
    };
  }
}