import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FriendDeleteService } from 'src/model/friend/service/friendDelete.service';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class DeletedFriendService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly friendDeleteService: FriendDeleteService,
  ) {}

  async deleteFriend(userId: number, friendId: number) {
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

      return await this.friendDeleteService.deleteFriend(friend.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting friend',
        error,
      );
    }
  }
}
