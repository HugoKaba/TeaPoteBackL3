import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class TeaFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyTeaByUserId(userId: number) {
    return await this.prismaService.tea.findMany({
      where: {
        userId,
      },
      include: {
        country: true,
        Image: true,
        Comments: true,
        HasTypes: {
          include: {
            TeaType: true,
          },
        },
        HasIngredients: {
          include: {
            Ingredient: true,
          },
        },
        HasMoment: {
          include: {
            moment: true,
          },
        },
      },
    });
  }

  async findTeaByTeaId(teaId: number) {
    return this.prismaService.tea.findUnique({
      where: { id: teaId },
      include: {
        country: true,
        Image: true,
        Comments: true,
        HasTypes: {
          include: {
            TeaType: true,
          },
        },
        HasIngredients: {
          include: {
            Ingredient: true,
          },
        },
        HasMoment: {
          include: {
            moment: true,
          },
        },
      },
    });
  }
}
