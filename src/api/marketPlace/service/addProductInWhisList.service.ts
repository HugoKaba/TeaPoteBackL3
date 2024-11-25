import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/config/prisma/prisma.service";
import { ProductFinderService } from "src/model/product/service/productfinder.service";
import { UserFinderService } from "src/model/user/service/userFinder.service";

@Injectable()
export class AddProductInWhisListService{
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly productFinderService: ProductFinderService,
    private readonly prismaService: PrismaService
  ) { }
  
  async addProductInWhisList(UserId: number, ProductId: number) {
    const user = await this.userFinderService.findUserById(UserId)
    if (!user) { throw new NotFoundException('User not found') }
    
    const product = await this.productFinderService.getProductById(ProductId)
    if (!product) { throw new NotFoundException('Product not found') }
    
    const favoriteProduct = await this.prismaService.favoriteProduct.create({
      data: {
        user: { connect: { id: user.id } },
        product: { connect: { id: product.id } }
      }
    })
    return favoriteProduct;
  }
}