import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DeleteTeaService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteTea(teaId: number) {
    await this.prismaService.tea.delete({
      where: {
        id: teaId,
      },
    });
  }
}
