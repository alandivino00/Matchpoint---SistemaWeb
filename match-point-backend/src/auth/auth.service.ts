import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }

  register(dto: RegisterDto) {
    const existing = this.usersService.findByEmail(dto.email);

    if (existing) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const user = this.usersService.create(dto);
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }
}