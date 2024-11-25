import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class GetAllProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProduct() {
    const products = await this.prismaService.product.findMany();
    return products;
  }
}
