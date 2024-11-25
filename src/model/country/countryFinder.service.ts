import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CountryFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findCountryById(countryId: number) {
    return this.prismaService.country.findUnique({
      where: { id: countryId },
    });
  }

  async findAllCountries() {
    return this.prismaService.country.findMany();
  }

  async finCountryByName(countryName: string) {
    return this.prismaService.country.findUnique({
      where: { name: countryName },
    });
  }
}
