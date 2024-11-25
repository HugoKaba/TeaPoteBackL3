import { Body, Controller, Get, Patch } from '@nestjs/common';
import { GetUserService } from './service/getUser.service';
import { GetCurrentUserId } from 'src/common/decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserService } from './service/updateUser.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  getUser(@GetCurrentUserId() userId: number) {
    return this.getUserService.getUser(userId);
  }

  @Patch()
  updateUser(
    @GetCurrentUserId() userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.updateUser(userId, updateUserDto);
  }
}
