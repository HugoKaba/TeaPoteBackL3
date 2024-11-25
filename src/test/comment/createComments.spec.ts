import { Test, TestingModule } from '@nestjs/testing';
import { CreateCommentService } from '../../api/tea/service/createComment.service';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UserFinderService } from '../../model/user/service/userFinder.service';
import { TeaFinderService } from '../../model/tea/service/teafinder.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentDto } from '../../api/tea/dto/createComment.dto';

describe('CreateCommentService', () => {
  let service: CreateCommentService;
  let prismaService: PrismaService;
  let userFinderService: UserFinderService;
  let teaFinderService: TeaFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCommentService,
        {
          provide: PrismaService,
          useValue: {
            comments: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: UserFinderService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: TeaFinderService,
          useValue: {
            findTeaByTeaId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateCommentService>(CreateCommentService);
    prismaService = module.get<PrismaService>(PrismaService);
    userFinderService = module.get<UserFinderService>(UserFinderService);
    teaFinderService = module.get<TeaFinderService>(TeaFinderService);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    const userId = 1;
    const createCommentDto: CreateCommentDto = {
      teaId: 1,
      text: 'Test comment',
    };

    jest.spyOn(userFinderService, 'findUserById').mockResolvedValue(null);

    await expect(
      service.createComment(userId, createCommentDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if tea does not exist', async () => {
    const userId = 1;
    const createCommentDto: CreateCommentDto = {
      teaId: 1,
      text: 'Test comment',
    };

    jest.spyOn(userFinderService, 'findUserById').mockResolvedValue({
      id: userId,
      name: 'Test User',
      mail: 'testuser@example.com',
      password: 'hashedpassword',
      urlImage: 'http://example.com/user.jpg',
      expiredAt: new Date(),
      stripeCustomerId: 'cus_test',
    });
    jest.spyOn(teaFinderService, 'findTeaByTeaId').mockResolvedValue(null);

    await expect(
      service.createComment(userId, createCommentDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create a comment if user and tea exist', async () => {
    const userId = 1;
    const createCommentDto: CreateCommentDto = {
      teaId: 1,
      text: 'Test comment',
    };

    jest.spyOn(userFinderService, 'findUserById').mockResolvedValue({
      id: userId,
      name: 'Test User',
      mail: 'testuser@example.com',
      password: 'hashedpassword',
      urlImage: 'http://example.com/user.jpg',
      expiredAt: new Date(),
      stripeCustomerId: 'cus_test',
    });
    jest.spyOn(teaFinderService, 'findTeaByTeaId').mockResolvedValue({
      id: createCommentDto.teaId,
      name: 'Green Tea',
      userId: 1,
      isInTeabag: true,
      tempMin: 70,
      tempMax: 80,
      timeMin: 3,
      timeMax: 5,
      isBio: true,
      tips: 'Test tips',
      countryId: 1,
      theine: 20,
      isFavorite: false,
      date: new Date(),
      Comments: [],
      country: { id: 1, name: 'China' },
      HasMoment: [],
      Image: {
        id: 1,
        urlImage: 'http://example.com/tea.jpg',
        teaId: createCommentDto.teaId,
      },
      HasTypes: {
        id: 1,
        teaTypeId: 1,
        teaId: createCommentDto.teaId,
        TeaType: {
          id: 1,
          name: 'Green Tea',
          urlImage: 'http://example.com/greentea.jpg',
          userId: 1,
        },
      },
      HasIngredients: [],
    });

    const mockComment = { id: 1, ...createCommentDto, userId };
    jest.spyOn(prismaService.comments, 'create').mockResolvedValue(mockComment);

    expect(await service.createComment(userId, createCommentDto)).toEqual(
      mockComment,
    );
  });

  it('should throw InternalServerErrorException for any other errors', async () => {
    const userId = 1;
    const createCommentDto: CreateCommentDto = {
      teaId: 1,
      text: 'Test comment',
    };

    jest.spyOn(userFinderService, 'findUserById').mockImplementation(() => {
      throw new Error('Some error');
    });

    await expect(
      service.createComment(userId, createCommentDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
