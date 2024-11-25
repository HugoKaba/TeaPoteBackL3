import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/api/user/dto/updateUser.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UserUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }
}
