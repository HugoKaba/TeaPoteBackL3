import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/createComment.dto';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { UserFinderService } from '../../../model/user/service/userFinder.service';
import { TeaFinderService } from '../../../model/tea/service/teafinder.service';

@Injectable()
export class CreateCommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFinderService: UserFinderService,
    private readonly teaFinderService: TeaFinderService,
  ) {}

  async createComment(userId: number, createCommentDto: CreateCommentDto) {
    try {
      const { teaId, text } = createCommentDto;

      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tea = await this.teaFinderService.findTeaByTeaId(teaId);
      if (!tea) {
        throw new NotFoundException('Tea not found');
      }

      const comment = await this.prismaService.comments.create({
        data: {
          teaId,
          text,
          userId: user.id,
        },
      });

      return comment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the comment',
        error,
      );
    }
  }
}
