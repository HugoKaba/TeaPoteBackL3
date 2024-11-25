import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTeaDto } from '../dto/createTea.dto';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { UserFinderService } from '../../../model/user/service/userFinder.service';
import checkDataBase from '../../../function/checkDataBaseConflicts';

@Injectable()
export class CreateTeaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async createTea(createTeaDto: CreateTeaDto, userId: number) {
    try {
      //recupération et déclaration des variables du dto
      const { countryId, HasIngredients, HasMoment, HasTypes, Image, ...rest } =
        createTeaDto;

      //verification de l'existance de l'utilisateur
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      //verification de l'existance du pays, des ingrédients, du type de thé et du moment
      const checks = [
        {
          field: 'id',
          value: countryId,
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

      if (HasMoment?.momentId) {
        checks.push({
          field: 'id',
          value: HasMoment.momentId,
          message: 'Moment not found',
          table: 'moment',
        });
      }

      const checker = new checkDataBase(this.prismaService);
      const conflicts = await checker.runChecks(checks);

      //affichage des erreur du a la non existance des donnée
      if (Object.keys(conflicts).length > 0) {
        throw new ConflictException(conflicts);
      }

      //creation de la requete de creation du thé avec prisma ,utilisation de transaction pour eviter les erreurs
      //de mapping entre les table

      const tea = await this.prismaService.$transaction(async (prisma) => {
        //creation du thé
        const createdTea = await prisma.tea.create({
          data: {
            userId: user.id,
            countryId: countryId,
            ...rest,
          },
        });

        //creation du teaType si un nouveau est renseigné
        let createdTeaType: any;
        if (HasTypes?.TeaType) {
          createdTeaType = await prisma.teaType.create({
            data: {
              ...HasTypes.TeaType,
              userId: user.id,
            },
          });
        }

        //creation de la relation entre le thé et le type de thé avec le nouveau ou celui deja existant
        if (HasTypes) {
          await prisma.hasTypes.create({
            data: {
              teaTypeId: createdTeaType?.id ?? HasTypes.teaTypeId,
              teaId: createdTea.id,
            },
          });
        }

        let createdMoments: any;

        //creation du moment si un nouveau est renseigné
        if (HasMoment.Moment) {
          createdMoments = await prisma.moment.create({
            data: {
              ...HasMoment.Moment,
              userId: user.id,
            },
          });
        }

        //creation de la relation entre le thé et le moment avec le nouveau ou celui deja existant
        if (HasMoment) {
          await prisma.hasMoment.create({
            data: {
              momentId: createdMoments?.id ?? HasMoment.momentId,
              teaId: createdTea.id,
            },
          });
        }

        //creation des ingrédients et de leur relation avec le thé
        for (const ingredient of HasIngredients) {
          let createdIngredient: any = null;
          if (ingredient.Ingredient) {
            createdIngredient = await prisma.ingredient.create({
              data: {
                ...ingredient.Ingredient,
                userId: user.id,
              },
            });
          }
          await prisma.hasIngredients.create({
            data: {
              ingredientId: createdIngredient?.id ?? ingredient.ingredientId,
              teaId: createdTea.id,
            },
          });
        }

        //creation de l'image du thé
        await prisma.image.create({
          data: {
            ...Image,
            teaId: createdTea.id,
          },
        });
      });

      return tea;
    } catch (error) {
      //affichage des erreurs pour le serveur
      console.error('Error creating tea:', error);

      //affichage des erreurs pour l'utilisateur
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the tea',
        error,
      );
    }
  }
}
