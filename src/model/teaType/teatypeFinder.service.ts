import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TeaTypeFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findteaTypeById(teaTypeId: number) {
    return this.prismaService.teaType.findUnique({
      where: { id: teaTypeId },
    });
  }

  async findAllUserTeaTypesbyUserIdAndName(userId: number, name: string) {
    return this.prismaService.teaType.findFirst({
      where: {
        AND: [
          {
            name: name,
          },
          {
            userId: userId,
          },
        ],
      },
    });
  }

  async findAllUserTeaTypes(userId: number) {
    return this.prismaService.teaType.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
