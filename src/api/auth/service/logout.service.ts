import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class LogoutService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async logout(userId: number) {
    let user: any;
    try {
      user = await this.userFinderService.findUserById(userId);
    } catch (error) {
      throw new InternalServerErrorException('Error finding user', error);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prismaService.jwtToken.updateMany({
        where: {
          userId: userId,
          refreshToken: { not: null },
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating JWT tokens',
        error,
      );
    }
  }
}
