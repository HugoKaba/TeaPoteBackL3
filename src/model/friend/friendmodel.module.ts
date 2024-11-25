import { Global, Module } from '@nestjs/common';
import { FriendFinderService } from './service/friendFinder.service';
import { FriendUpdaterService } from './service/friendUpdater.service';
import { FriendDeleteService } from './service/friendDelete.service';

@Global()
@Module({
  providers: [FriendFinderService, FriendUpdaterService, FriendDeleteService],
  exports: [FriendFinderService, FriendUpdaterService, FriendDeleteService],
})
export class FriendModelModule {}
