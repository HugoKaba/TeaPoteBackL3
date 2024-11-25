import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class UserFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(mail: string) {
    return this.prismaService.user.findUnique({
      where: { mail },
    });
  }

  async findUserByName(name: string) {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }

  async findUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  async findAllUser(userId: number) {
    return await this.prismaService.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
    });
  }
}
