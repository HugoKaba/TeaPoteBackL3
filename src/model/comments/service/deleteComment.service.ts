import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class DeleteCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteCommentById(commentId: number) {
    await this.prismaService.comments.delete({
      where: { id: commentId },
    });
  }
}
