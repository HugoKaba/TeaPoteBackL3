import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItemDto } from '../dto/cartItem.dto';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { ProductFinderService } from 'src/model/product/service/productfinder.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UpdateCartItemService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly productFinderService: ProductFinderService,
    private readonly prismaService: PrismaService,
  ) {}

  async updateCartItem(cartItemDto: CartItemDto, userId: number) {
    const { productId, quantity } = cartItemDto;

    const user = await this.userFinderService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productFinderService.getProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        userId: user.id,
        productId: product.id,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await this.prismaService.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: quantity,
        },
      });

      return updatedCartItem;
    } else {
      const cartItem = await this.prismaService.cartItem.create({
        data: {
          userId: user.id,
          productId: product.id,
          quantity,
        },
      });

      return cartItem;
    }
  }
}
