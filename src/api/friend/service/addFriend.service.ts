import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class AddFriendService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly prisma: PrismaService,
  ) {}

  async addFriend(userId: number, friendId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const friend = await this.friendFinderService.findFriendById(
        friendId,
        userId,
      );
      const reverseFriend = await this.friendFinderService.findFriendById(
        userId,
        friendId,
      );

      if (friend || reverseFriend) {
        throw new BadRequestException('Friendship already exists');
      }

      return await this.prisma.friend.create({
        data: {
          userId,
          friendId,
          accepted: false,
          blocked: false,
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while adding friend',
        error,
      );
    }
  }
}
