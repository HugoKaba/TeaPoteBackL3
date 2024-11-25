import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MomentFinderService } from 'src/model/moment/momentFinder.service';

@Injectable()
export class GetAllMomentService {
  constructor(private readonly momentFinderService: MomentFinderService) {}

  async getAllIngredients(userId: number) {
    try {
      const moments =
        await this.momentFinderService.findMomentByUserId(userId);
      const adminMoments =
        await this.momentFinderService.findMomentByUserId(1);
      if (!moments || moments.length === 0) {
        throw new NotFoundException('No moments found for this user');
      }

      const allMoments = moments.concat(adminMoments);

      return allMoments;
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
