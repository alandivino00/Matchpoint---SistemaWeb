import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(payload: {
    nome: string;
    email: string;
    password: string;
    atletica?: string;
    curso?: string;
    sobre?: string;
  }) {
    return this.prisma.user.create({
      data: payload,
    });
  }

  async update(
    id: string,
    payload: {
      nome?: string;
      email?: string;
      password?: string;
      atletica?: string;
      curso?: string;
      sobre?: string;
    },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.user.update({
      where: { id },
      data: payload,
    });
  }
}