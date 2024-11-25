import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class FriendUpdaterService {
  constructor(private readonly prisma: PrismaService) {}

  async updateFriendAccepted(friendId: number) {
    return await this.prisma.friend.update({
      where: { id: friendId },
      data: {
        accepted: true,
      },
    });
  }
  async updateFriendBlocked(friendId: number) {
    return await this.prisma.friend.update({
      where: { id: friendId },
      data: {
        blocked: true,
      },
    });
  }
}
