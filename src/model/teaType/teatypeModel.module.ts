import { Global, Module } from '@nestjs/common';
import { TeaTypeFinderService } from './teatypeFinder.service';

@Global()
@Module({
  providers: [TeaTypeFinderService],
  exports: [TeaTypeFinderService],
})
export class TeaTypeModelModule {}
