import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class CartFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCartByUserId(userId: number) {
    return await this.prismaService.cartItem.findMany({
      where: { userId: userId },
      include: {
        product: true,
      },
    });
  }
}
