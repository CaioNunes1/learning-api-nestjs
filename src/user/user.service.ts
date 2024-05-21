import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(email: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
            email: {
              contains: email,
              mode: 'insensitive', // A busca é insensível a maiúsculas e minúsculas
            },        
      },
    });
  }
}