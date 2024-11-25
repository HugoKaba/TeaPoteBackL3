import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import hashData from 'src/function/hashData';
import { UserCompletedDto } from '../dto/userCompleted.dto';
import { MailerService } from 'src/config/mail/mailer.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { JwtGenerateService } from 'src/model/jwt/service/jwtGenerate.service';
import { JwtUpdateService } from 'src/model/jwt/service/jwtUpdate.service';
import checkDataBase from '../../../function/checkDataBaseConflicts';
import { StripeService } from 'src/config/stripe/stripe.service';

@Injectable()
export class SignupService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtGenerateService: JwtGenerateService,
    private readonly jwtUpdateService: JwtUpdateService,
    private readonly mailService: MailerService,
    private readonly stripeService: StripeService,
  ) {}

  async signup(userCompletedDto: UserCompletedDto) {
    const { mail, password, name, ...rest } = userCompletedDto;

    try {
      const checker = new checkDataBase(this.prismaService);
      const conflicts = await checker.runChecks([
        {
          field: 'mail',
          value: mail,
          message: 'User already exists',
          exist: true,
        },
        {
          field: 'name',
          value: name,
          message: 'Username already exists',
          exist: true,
        },
      ]);

      if (Object.keys(conflicts).length > 0) {
        throw new ConflictException(conflicts);
      }

      const hash = await hashData(password);

      const user = await this.prismaService.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            mail,
            name,
            password: hash,
            ...rest,
          },
        });

        await prisma.jwtToken.create({
          data: {
            userId: newUser.id,
            refreshToken: '',
          },
        });

        return newUser;
      });

      const stripeCustomer = await this.stripeService.createCustomer(
        mail,
      );

      await this.prismaService.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomer.id },
      });

      await this.mailService.sendSignupConfirmation(user.mail);

      const tokens = await this.jwtGenerateService.getToken(user.id, user.mail);

      await this.jwtUpdateService.updateRtHash(user.id, tokens.refresh_token);

      return { data: 'User successfully created', userId: user.id };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during user registration',
        error,
      );
    }
  }
}
