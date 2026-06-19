import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
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
  create(@Body() payload: any) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.usersService.update(id, payload);
  }
}