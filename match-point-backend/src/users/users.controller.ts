import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return {
      success: true,
      message: 'Usuários listados com sucesso',
      data: this.usersService.findAll(),
    };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return {
      success: true,
      message: 'Usuário encontrado com sucesso',
      data: this.usersService.findById(id),
    };
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return {
      success: true,
      message: 'Usuário criado com sucesso',
      data: this.usersService.create(payload),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return {
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: this.usersService.update(id, payload),
    };
  }
}