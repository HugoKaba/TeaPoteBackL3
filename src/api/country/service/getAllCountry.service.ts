import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CountryFinderService } from 'src/model/country/countryFinder.service';

@Injectable()
export class GetAllCountryService {
  constructor(
    private readonly countryFinderService: CountryFinderService,
  ) {}

  async getAllCountry() {
    try {
      const country = await this.countryFinderService.findAllCountries();
      if (!country || country.length === 0) {
        throw new NotFoundException('No ingredients found for this user');
      }

      return country;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching teas',
        error,
      );
    }
  }
}
