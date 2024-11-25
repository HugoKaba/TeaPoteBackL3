import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetOneTeaService {
  constructor(
    private readonly teaFinderService: TeaFinderService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async getOneTea(teaId: number, userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tea = await this.teaFinderService.findTeaByTeaId(teaId);
      if (!tea) {
        throw new NotFoundException('Tea not found');
      }

      return tea;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching the tea',
        error,
      );
    }
  }
}
