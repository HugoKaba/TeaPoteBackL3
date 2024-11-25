import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class IngredientsFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findIngredientsById(ingredientId: number) {
    return this.prismaService.ingredient.findUnique({
      where: { id: ingredientId },
    });
  }

  async findAllIngredients(userId: number) {
    return this.prismaService.ingredient.findMany({
      where: {
        OR: [
          { userId: userId },
          { userId: 1 },
        ],
      },
    });
  }
}
