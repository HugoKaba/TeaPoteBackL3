import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetAllTeaService {
  constructor(
    private readonly teaFinderService: TeaFinderService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async getAllTea(userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const teas = await this.teaFinderService.findManyTeaByUserId(userId);
      if (!teas || teas.length === 0) {
        return;
      }

      return teas;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching teas',
        error,
      );
    }
  }
}
