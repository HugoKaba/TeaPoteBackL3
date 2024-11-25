import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetAllFriendService {
  constructor(private readonly userFinderService: UserFinderService) {}

  async getAllFriend(userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const myFriends = await this.userFinderService.findAllUser(userId);
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
