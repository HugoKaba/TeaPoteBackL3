import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { UserFinderService } from '../../../model/user/service/userFinder.service';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import checkDataBase from '../../../function/checkDataBaseConflicts';

@Injectable()
export class CopyAdminTeaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
    private readonly teaFinderService: TeaFinderService,
  ) {}

  async copyAdminTea(teaId: number, userId: number) {
    const adminId = 1;

    try {
      const admin = await this.userFinderService.findUserById(adminId);
      if (!admin) {
        throw new NotFoundException('Admin user not found');
      }

      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const teaToCopy = await this.teaFinderService.findTeaByTeaId(teaId);
      if (!teaToCopy) {
        throw new NotFoundException('Tea not found');
      }

      if (teaToCopy.userId !== adminId) {
        throw new ConflictException('The tea does not belong to the admin');
      }

      const {
        country,
        HasIngredients,
        HasMoment,
        HasTypes,
        Image,
        Comments,
        date,
        id,
        ...rest
      } = teaToCopy;
      delete rest.userId;
      rest.userId = userId;
      const checks = [
        {
          field: 'id',
          value: country.id,
          message: 'Country not found',
          table: 'country',
        },
      ];

      if (Array.isArray(HasIngredients)) {
        for (const ingredient of HasIngredients) {
          if (ingredient?.ingredientId) {
            checks.push({
              field: 'id',
              value: ingredient.ingredientId,
              message: 'Ingredient not found',
              table: 'ingredient',
            });
          }
        }
      }

      if (HasTypes?.teaTypeId) {
        checks.push({
          field: 'id',
          value: HasTypes.teaTypeId,
          message: 'Tea type not found',
          table: 'teaType',
        });
      }

      if (Array.isArray(HasMoment)) {
        for (const moment of HasMoment) {
          checks.push({
            field: 'id',
            value: moment.momentId,
            message: 'Moment not found',
            table: 'moment',
          });
        }
      }

      const checker = new checkDataBase(this.prismaService);
      const conflicts = await checker.runChecks(checks);

      if (Object.keys(conflicts).length > 0) {
        throw new ConflictException(conflicts);
      }
      console.log(user.id)

      const newTea = await this.prismaService.$transaction(async (prisma) => {
        const createdTea = await prisma.tea.create({
          data: {
            userId: user.id,
            countryId: country.id,
            ...rest,
          },
        });

        if (HasTypes) {
          await prisma.hasTypes.create({
            data: {
              teaTypeId: HasTypes.teaTypeId,
              teaId: createdTea.id,
            },
          });
        }

        if (Array.isArray(HasMoment)) {
          for (const moment of HasMoment) {
            await prisma.hasMoment.create({
              data: {
                momentId: moment.momentId,
                teaId: createdTea.id,
              },
            });
          }
        }

        if (Array.isArray(HasIngredients)) {
          for (const ingredient of HasIngredients) {
            await prisma.hasIngredients.create({
              data: {
                ingredientId: ingredient.ingredientId,
                teaId: createdTea.id,
              },
            });
          }
        }

        return createdTea;
      });

      return newTea;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while copying the tea',
        error,
      );
    }
  }
}
