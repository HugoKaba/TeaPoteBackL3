import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class ProductFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductById(productId: number) {
    return await this.prismaService.product.findUnique({
      where: { id: productId },
    });
  }
}
