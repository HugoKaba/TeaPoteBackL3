import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { SigninService } from './service/signin.service';
import { SignupService } from './service/signup.service';
import { LogoutService } from './service/logout.service';
import { AuthController } from './auth.controller';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { DeleteAccountService } from './service/deleteAccount.service';
import { ResetPasswordDemandService } from './service/resetPasswordDemand.service';
import { ResetPasswordConfirmationService } from './service/resetPasswordConfirmation.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [AuthController],
  providers: [
    SigninService,
    SignupService,
    LogoutService,
    DeleteAccountService,
    ResetPasswordDemandService,
    ResetPasswordConfirmationService,
  ],
})
export class AuthModule {}
