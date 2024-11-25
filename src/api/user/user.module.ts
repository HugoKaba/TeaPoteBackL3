import { UserController } from './user.controller';
import { GetUserService } from './service/getUser.service';
import { Module } from '@nestjs/common';
import { UpdateUserService } from './service/updateUser.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [GetUserService, UpdateUserService],
})
export class UserModule {}
