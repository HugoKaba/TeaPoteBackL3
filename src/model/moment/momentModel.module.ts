import { MomentFinderService } from './momentFinder.service';

import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [MomentFinderService],
  exports: [MomentFinderService],
})
export class MomentModelModule {}
