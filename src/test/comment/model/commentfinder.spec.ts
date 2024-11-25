import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { CommentFinderService } from '../../../model/comments/service/commentFinder.service';

describe('CommentFinderService', () => {
  let service: CommentFinderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentFinderService,
        {
          provide: PrismaService,
          useValue: {
            comments: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommentFinderService>(CommentFinderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a comment when given a valid ID', async () => {
    const expectedComment = {
      id: 40,
      teaId: 18,
      userId: 40,
      text: 'This is a comment',
    };
    jest
      .spyOn(prismaService.comments, 'findUnique')
      .mockResolvedValue(expectedComment);

    const result = await service.getCommentById(40);

    expect(result).toEqual(expectedComment);
    expect(prismaService.comments.findUnique).toHaveBeenCalledWith({
      where: { id: 40 },
    });
  });

  it('should return null if the comment is not found', async () => {
    jest.spyOn(prismaService.comments, 'findUnique').mockResolvedValue(null);

    const result = await service.getCommentById(41);

    expect(result).toBeNull();
    expect(prismaService.comments.findUnique).toHaveBeenCalledWith({
      where: { id: 41 },
    });
  });
});
