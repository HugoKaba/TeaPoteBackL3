import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import checkDataBase from 'src/function/checkDataBaseConflicts';
import { UpdateTeaDto } from '../dto/updateTea.dto';
import {
  HasIngredientDto,
  HasMomentDto,
  HasTypesDto,
  ImageDto,
} from '../dto/updateTea.dto';
@Injectable()
export class UpdateTeaService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateTea(updateTeaDto: UpdateTeaDto, userId: number, teaId: number) {
    try {
      const { countryId, HasIngredients, HasMoment, HasTypes, Image, ...rest } =
        updateTeaDto;

      const existingTea = await this.prismaService.tea.findUnique({
        where: { id: teaId },
      });

      if (!existingTea) {
        throw new NotFoundException('Tea not found');
      }

      const updatedFields: any = { ...rest };

      const checks = [];

      if (countryId) {
        checks.push({
          field: 'id',
          value: countryId,
          message: 'Country not found',
          table: 'country',
        });
        updatedFields.countryId = countryId;
      }

      const checker = new checkDataBase(this.prismaService);
      const conflicts = await checker.runChecks(checks);

      if (Object.keys(conflicts).length > 0) {
        throw new ConflictException(conflicts);
      }

      const updateActions = [];

      for (const [key, value] of Object.entries(updateTeaDto)) {
        switch (key) {
          case 'HasIngredients':
            updateActions.push(
              this.updateIngredients(teaId, HasIngredients, userId),
            );
            break;
          case 'HasMoment':
            updateActions.push(this.updateMoments(teaId, HasMoment, userId));
            break;
          case 'HasTypes':
            updateActions.push(this.updateTypes(teaId, HasTypes, userId));
            break;
          case 'Image':
            updateActions.push(this.updateImage(teaId, Image));
            break;
          default:
            break;
        }
      }

      await this.prismaService.$transaction(async (prisma) => {
        await prisma.tea.update({
          where: { id: teaId },
          data: updatedFields,
        });

        await Promise.all(updateActions);
      });

      return { message: 'Tea updated successfully' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the tea',
        error,
      );
    }
  }

  private async updateIngredients(
    teaId: number,
    HasIngredients: HasIngredientDto[],
    userId: number,
  ) {
    await this.prismaService.hasIngredients.deleteMany({ where: { teaId } });

    for (const ingredient of HasIngredients) {
      let createdIngredient: any = null;
      if (ingredient.Ingredient) {
        createdIngredient = await this.prismaService.ingredient.create({
          data: {
            name: ingredient.Ingredient.name,
            user: { connect: { id: userId } },
          },
        });
      }

      await this.prismaService.hasIngredients.create({
        data: {
          ingredientId: createdIngredient?.id ?? ingredient.ingredientId,
          teaId,
        },
      });
    }
  }

  private async updateMoments(
    teaId: number,
    HasMoment: HasMomentDto,
    userId: number,
  ) {
    await this.prismaService.hasMoment.deleteMany({ where: { teaId } });

    let createdMoment: any = null;
    if (HasMoment && HasMoment.Moment) {
      createdMoment = await this.prismaService.moment.create({
        data: {
          ...HasMoment.Moment,
          user: { connect: { id: userId } },
        },
      });
    }

    await this.prismaService.hasMoment.create({
      data: {
        momentId: createdMoment?.id ?? HasMoment?.momentId,
        teaId,
      },
    });
  }

  private async updateTypes(
    teaId: number,
    HasTypes: HasTypesDto,
    userId: number,
  ) {
    await this.prismaService.hasTypes.deleteMany({ where: { teaId } });

    let createdTeaType: any = null;
    if (HasTypes && HasTypes.TeaType) {
      createdTeaType = await this.prismaService.teaType.create({
        data: {
          ...HasTypes.TeaType,
          user: { connect: { id: userId } },
        },
      });
    }

    await this.prismaService.hasTypes.create({
      data: {
        teaTypeId: createdTeaType?.id ?? HasTypes?.teaTypeId,
        teaId,
      },
    });
  }

  private async updateImage(teaId: number, Image: ImageDto) {
    await this.prismaService.image.deleteMany({ where: { teaId } });

    if (Image) {
      await this.prismaService.image.create({
        data: {
          ...Image,
          tea: { connect: { id: teaId } },
        },
      });
    }
  }
}
