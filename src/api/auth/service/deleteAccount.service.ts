import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DeleteAccountDto } from '../dto/deleteAccount.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class DeleteAccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto) {
    const { password } = deleteAccountDto;
    let user: any;

    try {
      user = await this.userFinderService.findUserById(userId);
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      throw new BadRequestException('password or email does not match');
    try {
      await this.prismaService.user.update({
        where: { mail: user.mail },
        data: { expiredAt: new Date() },
      });
      return { data: 'User deleted' };
    } catch (error) {
      throw new InternalServerErrorException('Error updating user', error);
    }
  }
}
