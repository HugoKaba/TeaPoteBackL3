import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetUserService {
  constructor(private readonly userFinderService: UserFinderService) {}

  async getUser(userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching the user',
        error,
      );
    }
  }
}
