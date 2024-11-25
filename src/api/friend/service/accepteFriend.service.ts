import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { FriendUpdaterService } from 'src/model/friend/service/friendUpdater.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class AccepteFriendService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly friendUpdaterService: FriendUpdaterService,
  ) {}

  async accepteFriend(userId: number, friendId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const friend = await this.friendFinderService.findFriendById(
        friendId,
        userId,
      );
      if (!friend) {
        throw new NotFoundException('Friend request not found');
      }

      if (friend.accepted) {
        throw new BadRequestException('Friendship already accepted');
      }

      return await this.friendUpdaterService.updateFriendAccepted(friend.id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while accepting friend',
        error,
      );
    }
  }
}
