import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class CommentUpdaterService {
  constructor(private readonly prismaService: PrismaService) {}
  async updateCommentById(commentId: number, newText: string) {
    return await this.prismaService.comments.update({
      where: { id: commentId },
      data: { text: newText },
    });
  }
}
