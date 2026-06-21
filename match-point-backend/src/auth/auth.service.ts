import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(dto: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }

  async register(dto: {
    nome: string;
    email: string;
    password: string;
    atletica?: string;
    curso?: string;
    sobre?: string;
  }) {
    const existing = await this.usersService.findByEmail(dto.email);

    if (existing) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const user = await this.usersService.create(dto);

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }
}