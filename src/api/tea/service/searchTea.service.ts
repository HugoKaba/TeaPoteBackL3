import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class SearchTeaService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchTeaByName(name: string, type: string, userId: number) {
    try {
      let whereCondition: any = {
        userId: userId,
      };

      if (name) {
        const searchTerm = name.replace(/"/g, '');
        whereCondition.name = {
          contains: searchTerm,
        };
      }

      if (type) {
        whereCondition.HasTypes = {
          TeaType: {
            name: type,
          },
        };
      }

      const teas = await this.prismaService.tea.findMany({
        where: whereCondition,
        include: {
          HasMoment: true,
          Comments: true,
          SharedCard: true,
          HasTypes: {
            include: {
              TeaType: true,
            },
          },
          HasIngredients: true,
          Image: true,
          country: true,
        },
      });

      return teas;
    } catch (error) {
      console.error(`Error searching for teas: ${error.message}`);
      throw new Error(`Failed to search teas: ${error.message}`);
    }
  }
}
