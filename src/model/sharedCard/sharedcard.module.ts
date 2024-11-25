import { Module, Global } from '@nestjs/common';
import { SharedCardFinderService } from './sharedcardFinder.service';

@Global()
@Module({
  providers: [SharedCardFinderService],
  exports: [SharedCardFinderService],
})
export class SharedCardModule {}
