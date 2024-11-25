import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service'; // Utilisation d'un chemin relatif

@Injectable()
export class CreateTeaService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTea(createTeaDto, userId: number) {
    try {
      const { countryId, ...rest } = createTeaDto;

      const tea = await this.prismaService.tea.create({
        data: {
          ...rest,
          countryId,
          userId,
        },
      });

      return tea;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating tea');
    }
  }
}
