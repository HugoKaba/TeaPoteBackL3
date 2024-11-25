import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class CommentFinderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentById(commentId: number) {
    return await this.prismaService.comments.findUnique({
      where: { id: commentId },
    });
  }
}
