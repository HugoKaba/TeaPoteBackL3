import { Module } from '@nestjs/common';
import { JwtRefreshToken } from './service/jwtRefreshToken.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessToken } from './service/jwtAccessToken.service';
import { JwtGenerateService } from './service/jwtGenerate.service';
import { JwtUpdateService } from './service/jwtUpdate.service';
import { JwtFinderService } from './service/jwtfinder.service';

@Module({
  imports: [JwtModule.register({})],
  exports: [
    JwtRefreshToken,
    JwtAccessToken,
    JwtGenerateService,
    JwtUpdateService,
    JwtFinderService,
  ],
  providers: [
    JwtRefreshToken,
    JwtAccessToken,
    JwtGenerateService,
    JwtUpdateService,
    JwtFinderService,
  ],
})
export class CustomJwtModelModule {}
