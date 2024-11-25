import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { SharedCardFinderService } from 'src/model/sharedCard/sharedcardFinder.service';

@Injectable()
export class DeleteShareCardService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly sharedCardFinderService: SharedCardFinderService,
    private readonly prisma: PrismaService,
  ) {}

  async deleteShareCard(userId: number, sharedCardId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const sharedCard =
        await this.sharedCardFinderService.findSharedCardById(sharedCardId);
      if (!sharedCard) {
        throw new NotFoundException('Shared card not found');
      }

      await this.prisma.sharedCard.delete({
        where: { id: sharedCard.id },
      });

      return `Shared card ${sharedCard.id} has been deleted`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the shared card',
        error,
      );
    }
  }
}
