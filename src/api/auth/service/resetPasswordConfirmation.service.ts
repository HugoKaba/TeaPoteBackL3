import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { ResetPasswordConfirmationDto } from '../dto/resetPasswordConfirmation.dto';
import hashData from 'src/function/hashData';

@Injectable()
export class ResetPasswordConfirmationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async resetPasswordConfirmation(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    let user: any;

    try {
      const { mail, code, password } = resetPasswordConfirmationDto;

      user = await this.userFinderService.findUserByEmail(mail);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const match = speakeasy.totp.verify({
        secret: this.configService.get('OTP_CODE'),
        token: code,
        digits: 5,
        step: 60 * 15,
        encoding: 'base64',
      });

      if (!match) {
        throw new BadRequestException('Invalid/expired Token');
      }

      const hash = await hashData(password);

      await this.prismaService.user.update({
        where: { mail },
        data: { password: hash },
      });

      return { data: 'Password Updated' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred during password reset',
        error,
      );
    }
  }
}
