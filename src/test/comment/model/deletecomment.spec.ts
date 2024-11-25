import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { DeleteCommentService } from '../../../model/comments/service/deleteComment.service';

describe('DeleteCommentService', () => {
  let service: DeleteCommentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCommentService,
        {
          provide: PrismaService,
          useValue: {
            comments: {
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeleteCommentService>(DeleteCommentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a comment by ID', async () => {
    const commentId = 1;

    await service.deleteCommentById(commentId);

    expect(prismaService.comments.delete).toHaveBeenCalledWith({
      where: { id: commentId },
    });
  });
});
