import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  nome: string;
  email: string;
  password: string; // plain for now; hash later
  atletica?: string;
  curso?: string;
  sobre?: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'u1',
      nome: 'João Silva',
      email: 'joao.silva@ufba.br',
      password: 'password', // CHANGE in production
      atletica: 'Pinguçu',
      curso: 'Ciência da Computação',
      sobre: 'Fã de esportes e treinos coletivos',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const u = this.users.find((x) => x.id === id);
    if (!u) throw new NotFoundException('Usuário não encontrado');
    return u;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((x) => x.email === email);
  }

  create(payload: Partial<User>): User {
    const user: User = {
      id: uuidv4(),
      nome: payload.nome ?? 'Novo usuário',
      email: payload.email!,
      password: payload.password ?? '',
      atletica: payload.atletica,
      curso: payload.curso,
      sobre: payload.sobre,
    };
    this.users.push(user);
    return user;
  }

  update(id: string, payload: Partial<User>): User {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('Usuário não encontrado');
    this.users[idx] = { ...this.users[idx], ...payload };
    return this.users[idx];
  }
}