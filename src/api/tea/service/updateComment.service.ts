import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentFinderService } from 'src/model/comments/service/commentfinder.service';
import { CommentUpdaterService } from 'src/model/comments/service/commentupdater.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class UpdateCommentService {
  constructor(
    private readonly commentFinderService: CommentFinderService,
    private readonly commentUpdaterService: CommentUpdaterService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async updateComment(commentId: number, text: string, userId: number) {
    try {
      const user = await this.userFinderService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const comment = await this.commentFinderService.getCommentById(commentId);
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      if (user.id !== comment.userId) {
        throw new NotFoundException("User doesn't own this comment");
      }

      const updatedComment = await this.commentUpdaterService.updateCommentById(
        comment.id,
        text,
      );

      return updatedComment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the comment',
        error,
      );
    }
  }
}
