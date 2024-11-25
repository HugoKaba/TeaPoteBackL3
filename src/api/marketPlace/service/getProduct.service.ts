import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProductFinderService } from 'src/model/product/service/productfinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productFinderService: ProductFinderService,
  ) {}

  async getAllProduct(productId: number) {
    const product = await this.productFinderService.getProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
