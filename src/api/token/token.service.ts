import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtFinderService } from 'src/model/jwt/service/jwtfinder.service';
import { JwtGenerateService } from 'src/model/jwt/service/jwtGenerate.service';
import { JwtUpdateService } from 'src/model/jwt/service/jwtUpdate.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtFinderService: JwtFinderService,
    private readonly userFinderService: UserFinderService,
    private readonly jwtGenerateService: JwtGenerateService,
    private readonly jwtUpdateService: JwtUpdateService,
  ) {}

  async RefreshToken(userId: number, refreshToken: string, req: any) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      const token = await this.jwtFinderService.findUserByUserId(userId);

      if (!user || !token || !token.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const rtMatches = await bcrypt.compare(refreshToken, token.refreshToken);
      if (!rtMatches) {
        throw new UnauthorizedException('Access Denied');
      }

      const tokens = await this.jwtGenerateService.getToken(user.id, user.mail);
      await this.jwtUpdateService.updateRtHash(user.id, tokens.refresh_token);

      return {
        csrfToken: req.csrfToken(),
        tokens: tokens,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while refreshing the token',
        error,
      );
    }
  }
}
