import {
  BadRequestException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '../dto/signin.dto';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { JwtGenerateService } from 'src/model/jwt/service/jwtGenerate.service';
import { JwtUpdateService } from 'src/model/jwt/service/jwtUpdate.service';

@Injectable()
export class SigninService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly jwtGenerateService: JwtGenerateService,
    private readonly jwtUpdateService: JwtUpdateService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { mail, name, password } = signinDto;

    let user: any;

    try {
      if (mail) {
        user = await this.userFinderService.findUserByEmail(mail);
      } else if (name) {
        user = await this.userFinderService.findUserByName(name);
      }

      if (!user) {
        throw new BadRequestException('Email or password does not match');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new BadRequestException('Email or password does not match');
      }

      const tokens = await this.jwtGenerateService.getToken(user.id, user.mail);

      await this.jwtUpdateService.updateRtHash(user.id, tokens.refresh_token);

      return {
        token: tokens,
        user: user,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during sign-in',
        error,
      );
    }
  }
}
