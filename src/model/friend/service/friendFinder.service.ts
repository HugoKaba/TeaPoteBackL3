import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class FriendFinderService {
  constructor(private readonly prisma: PrismaService) {}

  async findFriendById(friendId: number, userId: number) {
    return await this.prisma.friend.findFirst({
      where: { friendId: friendId, userId: userId },
    });
  }

  async findUserFriend(userId: number) {
    return await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId: userId, accepted: true },
          { friendId: userId, accepted: true },
        ],
      },
    });
  }
}
