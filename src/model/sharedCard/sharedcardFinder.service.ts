import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class SharedCardFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSharedCardById(sharedCardId: number) {
    return await this.prismaService.sharedCard.findUnique({
      where: { id: sharedCardId },
    });
  }

  async findSharedCardByUser(userId: number) {
    return await this.prismaService.sharedCard.findMany({
      where: { friendId: userId },
    });
  }
}
