import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class FriendDeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteFriend(friendId: number) {
    return await this.prisma.friend.delete({
      where: { id: friendId },
    });
  }
}
