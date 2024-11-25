import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function insertTeas() {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        mail: 'admin@admin.com',
        password: 'adminpasswordtropdureamemoriser',
        name: 'admin',
        urlImage: '',
      },
    });
  }
  await prisma.tea.deleteMany({
    where: {
      userId: 1,
    },
  });

  const data = fs.readFileSync('./teas.json', 'utf-8');
  const teas = JSON.parse(data);

  for (const tea of teas) {
    let countryId = null;
    if (tea.country.length > 0) {
      const countryName = tea.country[0];
      const country = await prisma.country.upsert({
        where: { name: countryName },
        update: {},
        create: { name: countryName },
      });
      countryId = country.id;
    }

    const newTea = await prisma.tea.create({
      data: {
        name: tea.name,
        userId: user.id,
        isInTeabag: true,
        tempMin: parseInt(tea.TempMin),
        tempMax: parseInt(tea.TempMax),
        timeMin: parseInt(tea.TimerMin),
        timeMax: parseInt(tea.TimerMax),
        isBio: tea.is_bio,
        tips: tea.tip,
        countryId: countryId,
        theine: 0,
        isFavorite: false,
      },
    });

    if (tea['Tea Type'].length > 0) {
      const firstTeaType = tea['Tea Type'][0];
      let teaType = await prisma.teaType.findFirst({
        where: { AND: [{ name: firstTeaType }, { userId: 1 }] },
      });

      if (!teaType) {
        teaType = await prisma.teaType.create({
          data: { name: firstTeaType, userId: 1, urlImage: '' },
        });
      }

      await prisma.hasTypes.create({
        data: {
          teaTypeId: teaType.id,
          teaId: newTea.id,
        },
      });
    }

    if (tea.ingredients && tea.ingredients.length > 0) {
      for (const ingredient of tea.ingredients) {
        let ingredientRecord = await prisma.ingredient.findFirst({
          where: { AND: [{ name: ingredient }, { userId: 1 }] },
        });

        if (!ingredientRecord) {
          ingredientRecord = await prisma.ingredient.create({
            data: { name: ingredient, userId: 1 },
          });
        }

        await prisma.hasIngredients.create({
          data: {
            ingredientId: ingredientRecord.id,
            teaId: newTea.id,
          },
        });
      }
    }

    if (tea.images.length > 0) {
      await prisma.image.create({
        data: {
          urlImage: tea.images[0],
          teaId: newTea.id,
        },
      });
    }

    if (Array.isArray(tea.moment) && tea.moment.length > 0) {
      let momentRecord = await prisma.moment.findFirst({
        where: { AND: [{ name: tea.moment[0] }, { userId: 1 }] },
      });

      if (!momentRecord) {
        momentRecord = await prisma.moment.create({
          data: { name: tea.moment[0], userId: 1, urlImage: '' },
        });
      }

      await prisma.hasMoment.create({
        data: {
          momentId: momentRecord.id,
          teaId: newTea.id,
        },
      });
    }

  }

  console.log('Données des thés insérées avec succès');
}

insertTeas()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
