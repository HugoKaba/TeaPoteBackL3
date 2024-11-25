import { Global, Module } from '@nestjs/common';
import { UserFinderService } from './service/userFinder.service';
import { UserUpdateService } from './service/userUpdate.service';

@Global()
@Module({
  providers: [UserFinderService, UserUpdateService],
  exports: [UserFinderService, UserUpdateService],
})
export class UserModelModule {}
