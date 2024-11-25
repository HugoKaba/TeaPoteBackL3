import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SharedCardFinderService } from 'src/model/sharedCard/sharedcardFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetSharedCardService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly sharedCardFinderService: SharedCardFinderService,
  ) {}

  async getSharedCard(userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const sharedCards =
        await this.sharedCardFinderService.findSharedCardByUser(user.id);

      if (!sharedCards || sharedCards.length === 0) {
        throw new NotFoundException('No shared cards found');
      }

      return sharedCards;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching shared cards',
        error,
      );
    }
  }
}
