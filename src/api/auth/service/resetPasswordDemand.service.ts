import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/config/mail/mailer.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { ResetPasswordDemandDto } from '../dto/resetPasswordDemand.dto';

@Injectable()
export class ResetPasswordDemandService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;

    let user: any;

    try {
      user = await this.userFinderService.findUserByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const code = speakeasy.totp({
        secret: this.configService.get('OTP_CODE'),
        digits: 5,
        step: 60 * 15,
        encoding: 'base64',
      });

      const url = this.configService.get('URL_CONFIRME_RESET_PASSWORD');

      await this.mailService.sendResetPassword(email, url, code);

      return {
        data: 'Reset password mail has been sent',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error in password reset request',
        error,
      );
    }
  }
}
