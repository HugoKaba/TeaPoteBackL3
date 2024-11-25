import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProductFinderService } from 'src/model/product/service/productfinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetCartService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async getCart(userId: number) {
    const user = await this.userFinderService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = await this.prismaService.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    
    return cart;
  }
}
