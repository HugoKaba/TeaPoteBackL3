import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class JwtFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByUserId(userId: number) {
    return this.prismaService.jwtToken.findUnique({
      where: { userId },
    });
  }
}
