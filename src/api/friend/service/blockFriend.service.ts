import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { FriendUpdaterService } from 'src/model/friend/service/friendUpdater.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class BlockFriendService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly friendUpdaterService: FriendUpdaterService,
  ) {}

  async blockFriend(userId: number, friendId: number) {
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

      if (friend.blocked) {
        throw new BadRequestException('Friendship already blocked');
      }

      return await this.friendUpdaterService.updateFriendBlocked(friend.id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while blocking friend',
        error,
      );
    }
  }
}
