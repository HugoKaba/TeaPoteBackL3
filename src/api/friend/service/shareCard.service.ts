import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { ShareCardDto } from '../dto/shareCard.dto';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ShareCardService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly teaFinderService: TeaFinderService,
    private readonly prisma: PrismaService,
  ) {}

  async shareCard(userId: number, shareCard: ShareCardDto) {
    try {
      const { friendId, teaId } = shareCard;

      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tea = await this.teaFinderService.findTeaByTeaId(teaId);
      if (!tea) {
        throw new NotFoundException('Tea not found');
      }

      const friend = await this.friendFinderService.findFriendById(
        friendId,
        userId,
      );
      const reverseFriend = await this.friendFinderService.findFriendById(
        userId,
        friendId,
      );

      if (!friend && !reverseFriend) {
        throw new NotFoundException('Friendship does not exist');
      }

      if (
        (friend && !friend.accepted) ||
        (reverseFriend && !reverseFriend.accepted)
      ) {
        throw new BadRequestException('Friend request not accepted');
      }

      return await this.prisma.sharedCard.create({
        data: {
          userId,
          friendId,
          teaId,
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
        'An error occurred while sharing the card',
        error,
      );
    }
  }
}
