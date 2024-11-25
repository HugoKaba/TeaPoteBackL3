import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import hashData from 'src/function/hashData';

@Injectable()
export class JwtUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateRtHash(userId: number, rt: string) {
    const hash = await hashData(rt);
    await this.prismaService.jwtToken.update({
      where: { userId: userId },
      data: {
        refreshToken: hash,
      },
    });
  }
}
