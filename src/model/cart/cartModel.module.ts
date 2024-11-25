import { Global, Module } from '@nestjs/common';
import { CartFinderService } from './service/cartFinder.service';


@Global()
@Module({
  providers: [CartFinderService],
  exports: [CartFinderService],
})
export class CartModelModule {}
