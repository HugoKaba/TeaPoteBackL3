import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class GetAdminTeaService {
  constructor(
    private readonly teaFinderService: TeaFinderService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async getAdminTea() {
    const adminId = 1;

    try {
      const admin = await this.userFinderService.findUserById(adminId);
      if (!admin) {
        throw new NotFoundException('Admin user not found');
      }

      const teas = await this.teaFinderService.findManyTeaByUserId(adminId);
      if (!teas || teas.length === 0) {
        throw new NotFoundException('No teas found for the admin user');
      }

      return teas;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching teas for the admin',
        error,
      );
    }
  }
}
