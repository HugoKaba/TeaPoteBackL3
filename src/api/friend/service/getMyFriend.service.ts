import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetMyFriendService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
  ) {}

  async getMyFriend(userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const myFriends = await this.friendFinderService.findUserFriend(user.id);

      if (!myFriends || myFriends.length === 0) {
        throw new NotFoundException('No friends found');
      }

      return myFriends;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching friends',
        error,
      );
    }
  }
}
