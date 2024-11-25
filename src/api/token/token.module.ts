import { TokenService } from './token.service';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
