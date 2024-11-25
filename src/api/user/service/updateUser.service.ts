import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserUpdateService } from 'src/model/user/service/userUpdate.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly userUpdateService: UserUpdateService,
  ) {}

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedUser = await this.userUpdateService.updateUser(
        user.id,
        updateUserDto,
      );

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the user',
        error,
      );
    }
  }
}
