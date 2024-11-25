import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorator';

import { GetAllCountryService } from './service/getAllCountry.service';

@Controller('country')
export class CountryController {
  constructor(private readonly getAllCountryService: GetAllCountryService) {}

  @Get('all')
  @Public()
  getAllCountry() {
    return this.getAllCountryService.getAllCountry();
  }
}
