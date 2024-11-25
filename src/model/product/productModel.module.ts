
import { Module, Global } from '@nestjs/common';
import { ProductFinderService } from './service/productfinder.service';

@Global()
@Module({
  providers: [ProductFinderService, ],
  exports: [ProductFinderService, ],
})
export class ProductModelModule {}
