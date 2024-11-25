import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FriendFinderService } from 'src/model/friend/service/friendFinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AcceptedSharedCardDto } from '../dto/accepteSharedCard.dto';
import { SharedCardFinderService } from 'src/model/sharedCard/sharedcardFinder.service';

@Injectable()
export class AcceptedShareCardService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly friendFinderService: FriendFinderService,
    private readonly teaFinderService: TeaFinderService,
    private readonly prisma: PrismaService,
    private readonly sharedCardFinderService: SharedCardFinderService,
  ) {}

  async acceptedShareCard(
    userId: number,
    acceptedSharedCardDto: AcceptedSharedCardDto,
  ) {
    try {
      const { sharedCardId } = acceptedSharedCardDto;

      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const shareCard =
        await this.sharedCardFinderService.findSharedCardById(sharedCardId);
      if (!shareCard) {
        throw new NotFoundException('Shared card not found');
      }

      const tea = await this.teaFinderService.findTeaByTeaId(shareCard.teaId);
      if (!tea) {
        throw new NotFoundException('Tea not found');
      }

      const friend = await this.friendFinderService.findFriendById(
        shareCard.friendId,
        userId,
      );
      const reverseFriend = await this.friendFinderService.findFriendById(
        userId,
        shareCard.friendId,
      );

      if (!friend && !reverseFriend) {
        throw new NotFoundException('Friend request not found');
      }

      const newTeaData = { ...tea };
      delete newTeaData.id;
      delete newTeaData.date;
      newTeaData.userId = userId;

      const {
        Image,
        Comments,
        HasMoment,
        HasTypes,
        HasIngredients,
        country,
        ...rest
      } = newTeaData;

      const newTea = await this.prisma.$transaction(async (prisma) => {
        const createdTea = await prisma.tea.create({
          data: { ...rest },
        });

        if (Image) {
          await prisma.image.create({
            data: {
              ...Image,
              teaId: createdTea.id,
            },
          });
        }

        if (Comments && Comments.length > 0) {
          for (const comment of Comments) {
            await prisma.comments.create({
              data: {
                ...comment,
                teaId: createdTea.id,
              },
            });
          }
        }

        if (HasMoment && HasMoment.length > 0) {
          for (const hasMoment of HasMoment) {
            await prisma.hasMoment.create({
              data: {
                momentId: hasMoment.momentId,
                teaId: createdTea.id,
              },
            });
          }
        }

        if (HasTypes) {
          await prisma.hasTypes.create({
            data: {
              teaTypeId: HasTypes.teaTypeId,
              teaId: createdTea.id,
            },
          });
        }

        if (HasIngredients && HasIngredients.length > 0) {
          for (const ingredient of HasIngredients) {
            await prisma.hasIngredients.create({
              data: {
                ingredientId: ingredient['Ingredient'].id,
                teaId: createdTea.id,
              },
            });
          }
        }

        return createdTea;
      });

      await this.prisma.sharedCard.delete({
        where: { id: shareCard.id },
      });

      return newTea;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while accepting shared card',
        error,
      );
    }
  }
}
