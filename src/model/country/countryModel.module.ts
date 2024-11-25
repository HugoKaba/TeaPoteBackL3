import { Global, Module } from '@nestjs/common';
import { CountryFinderService } from './countryFinder.service';

@Global()
@Module({
  providers: [CountryFinderService],
  exports: [CountryFinderService],
})
export class CountryModelModule {}
