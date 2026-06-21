import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(
    @Body()
    payload: {
      nome: string;
      email: string;
      password: string;
      atletica?: string;
      curso?: string;
      sobre?: string;
    },
  ) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    payload: {
      nome?: string;
      email?: string;
      password?: string;
      atletica?: string;
      curso?: string;
      sobre?: string;
    },
  ) {
    return this.usersService.update(id, payload);
  }
}