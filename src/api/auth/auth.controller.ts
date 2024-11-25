import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserCompletedDto } from './dto/userCompleted.dto';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { SigninService } from './service/signin.service';
import { SignupService } from './service/signup.service';
import { DeleteAccountService } from './service/deleteAccount.service';
import { ResetPasswordDemandService } from './service/resetPasswordDemand.service';
import { ResetPasswordConfirmationService } from './service/resetPasswordConfirmation.service';
import { LogoutService } from './service/logout.service';
import { GetCurrentUserId } from 'src/common/decorator';
import { Public } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinService: SigninService,
    private readonly signupService: SignupService,
    private readonly logoutService: LogoutService,
    private readonly deletedAccountService: DeleteAccountService,
    private readonly resetPasswordDemandeService: ResetPasswordDemandService,
    private readonly resetPasswordConfirmationService: ResetPasswordConfirmationService,
  ) {}

  @Public()
  @Post('signup')
  signup(@Body() userCompletedDto: UserCompletedDto) {
    return this.signupService.signup(userCompletedDto);
  }

  @Public()
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    console.log(signinDto);
    return this.signinService.signin(signinDto);
  }

  @Post('reset-password')
  resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.resetPasswordDemandeService.resetPasswordDemand(
      resetPasswordDemandDto,
    );
  }

  @Post('reset-password-confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    return this.resetPasswordConfirmationService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }

  @Delete('delete')
  deleteAccount(
    @GetCurrentUserId() userId: number,
    @Body()
    deleteAccountDto: DeleteAccountDto,
  ) {
    return this.deletedAccountService.deleteAccount(userId, deleteAccountDto);
  }

  @Post('logout')
  logout(@GetCurrentUserId() userId: number) {
    return this.logoutService.logout(userId);  }
}
