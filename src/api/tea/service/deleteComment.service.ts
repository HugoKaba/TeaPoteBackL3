import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentFinderService } from 'src/model/comments/service/commentfinder.service';
import { DeleteCommentService } from 'src/model/comments/service/deleteComment.service';
import { UserFinderService } from 'src/model/user/service/userFinder.service';

@Injectable()
export class DeletedCommentService {
  constructor(
    private readonly commentFinderService: CommentFinderService,
    private readonly deleteCommentService: DeleteCommentService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async deleteComment(commentId: number, userId: number) {
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

      await this.deleteCommentService.deleteCommentById(comment.id);

      return `Comment ${comment.id} has been deleted`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the comment',
        error,
      );
    }
  }
}
