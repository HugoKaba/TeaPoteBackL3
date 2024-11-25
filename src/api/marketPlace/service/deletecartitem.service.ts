import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { ProductFinderService } from 'src/model/product/service/productfinder.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DeleteCartItemService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly productFinderService: ProductFinderService,
    private readonly prismaService: PrismaService,
  ) {}

  async deleteCartItem(cartItemId: number, userId: number) {
    const user = await this.userFinderService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productFinderService.getProductById(cartItemId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prismaService.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }
}
