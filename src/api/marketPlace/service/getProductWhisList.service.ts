import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetProductInWhisListService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly prismaService: PrismaService,
  ) {}

  async getProductInWhisList(UserId: number) {
    const user = await this.userFinderService.findUserById(UserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const wishList = await this.prismaService.favoriteProduct.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    return wishList;
  }
}
