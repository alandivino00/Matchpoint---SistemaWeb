import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // naive login - returns user if password matches; replace with JWT in next step
  login(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // return a simple session object for now
    return { message: 'ok', user: { id: user.id, nome: user.nome, email: user.email } };
  }

  register(payload: any) {
    const existing = this.usersService.findByEmail(payload.email);
    if (existing) throw new UnauthorizedException('Email já cadastrado');
    const user = this.usersService.create(payload);
    return { id: user.id, nome: user.nome, email: user.email };
  }
}