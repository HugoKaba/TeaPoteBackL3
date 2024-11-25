import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProductFinderService } from 'src/model/product/service/productfinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class DeleteProductInWhisListService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly productFinderService: ProductFinderService,
    private readonly prismaService: PrismaService,
  ) {}

  async deleteProductInWhisList(UserId: number, ProductId: number) {
    const user = await this.userFinderService.findUserById(UserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productFinderService.getProductById(ProductId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prismaService.favoriteProduct.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id,
        },
      },
    });
    return 'Product deleted from whislist';
  }
}
