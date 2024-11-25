import { Global, Module } from '@nestjs/common';
import { IngredientsFinderService } from './ingredientsfinder.service';

@Global()
@Module({
  providers: [IngredientsFinderService],
  exports: [IngredientsFinderService],
})
export class IngredientsModelModule {}
