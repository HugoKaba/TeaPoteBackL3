import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { CommentUpdaterService } from '../../../model/comments/service/commentUpdater.service';

describe('CommentUpdaterService', () => {
  let service: CommentUpdaterService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentUpdaterService,
        {
          provide: PrismaService,
          useValue: {
            comments: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommentUpdaterService>(CommentUpdaterService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a comment by ID with new text', async () => {
    const mockUpdatedComment = {
      id: 1,
      teaId: 1,
      userId: 1,
      text: 'New updated text',
    };

    jest
      .spyOn(prismaService.comments, 'update')
      .mockResolvedValue(mockUpdatedComment);

    const updatedComment = await service.updateCommentById(
      1,
      'New updated text',
    );

    expect(updatedComment).toEqual(mockUpdatedComment);
    expect(prismaService.comments.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { text: 'New updated text' },
    });
  });
});
