import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function insertCountries() {
  const data = fs.readFileSync('./countries.json', 'utf-8');
  const countries = JSON.parse(data);

  for (const country of countries) {
    const existingCountry = await prisma.country.findUnique({
      where: {
        name: country.name,
      },
    });

    if (!existingCountry) {
      await prisma.country.create({
        data: {
          name: country.name,
        },
      });
    }
  }

  console.log('Données des pays insérées avec succès');
}

insertCountries()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
