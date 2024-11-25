import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorator';
import { RtGuard } from 'src/common/guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenServices: TokenService) {}

  @Get('csrf')
  getCsrfToken(@Req() req: any): any {
    return {
      token: req.csrfToken(),
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  RefreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Req() req: any,
  ) {
    return this.tokenServices.RefreshToken(userId, refreshToken, req);
  }
}
