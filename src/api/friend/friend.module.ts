import { FriendController } from './friend.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { AddFriendService } from './service/addFriend.service';
import { AccepteFriendService } from './service/accepteFriend.service';
import { BlockFriendService } from './service/blockFriend.service';
import { DeletedFriendService } from './service/deleteFriend.service';
import { ShareCardService } from './service/shareCard.service';
import { AcceptedShareCardService } from './service/accepteSharedCard.service';
import { GetMyFriendService } from './service/getMyFriend.service';
import { DeleteShareCardService } from './service/deleteShareCard.service';
import { GetAllFriendService } from './service/getAllFriend.service';
import { GetSharedCardService } from './service/getSharedCard.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [FriendController],
  providers: [
    AddFriendService,
    AccepteFriendService,
    BlockFriendService,
    DeletedFriendService,
    ShareCardService,
    AcceptedShareCardService,
    GetMyFriendService,
    DeleteShareCardService,
    GetAllFriendService,
    GetSharedCardService,
  ],
})
export class FriendModule {}
