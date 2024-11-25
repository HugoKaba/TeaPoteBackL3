import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MomentFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMomentById(momentId: number) {
    return this.prismaService.moment.findUnique({
      where: { id: momentId },
    });
  }

  async findMomentByUserId(userId: number) {
    return this.prismaService.moment.findMany({
      where: { userId: userId, },
    });
  }
}
