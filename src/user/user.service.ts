import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(query: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            firstname: {
              contains: query,
              mode: 'insensitive', // Case-insensitive search
            },
          },
        ],
      },
    });
  }
}