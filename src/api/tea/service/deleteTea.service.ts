import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteTeaService } from 'src/model/tea/service/deleteTea.service';
import { TeaFinderService } from 'src/model/tea/service/teafinder.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class DeletedTeaService {
  constructor(
    private readonly deleteTeaService: DeleteTeaService,
    private readonly teaFinderService: TeaFinderService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async deleteTea(teaId: number, userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tea = await this.teaFinderService.findTeaByTeaId(teaId);
      if (!tea) {
        throw new NotFoundException('Tea not found');
      }

      if (user.id !== tea.userId) {
        throw new NotFoundException("User doesn't own this tea");
      }

      await this.deleteTeaService.deleteTea(tea.id);

      return `Tea ${tea.id} deleted`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the tea',
        error,
      );
    }
  }
}
