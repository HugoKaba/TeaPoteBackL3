import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { CountryController } from './country.controller';
import { GetAllCountryService } from './service/getAllCountry.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [CountryController],
  providers: [GetAllCountryService],
})
export class CountryModule {}
