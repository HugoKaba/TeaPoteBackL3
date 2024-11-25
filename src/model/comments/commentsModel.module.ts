import { Global, Module } from '@nestjs/common';
import { CommentFinderService } from './service/commentfinder.service';
import { CommentUpdaterService } from './service/commentupdater.service';
import { DeleteCommentService } from './service/deleteComment.service';

@Global()
@Module({
  providers: [
    CommentFinderService,
    CommentUpdaterService,
    DeleteCommentService,
  ],
  exports: [CommentFinderService, CommentUpdaterService, DeleteCommentService],
})
export class CommentsModelModule {}
