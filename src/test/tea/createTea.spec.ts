import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeaService } from '../../model/tea/service/createTea.service';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UserFinderService } from '../../model/user/service/userFinder.service';

describe('CreateTeaService', () => {
  let createTeaService: CreateTeaService;
  let prismaServiceMock: PrismaService;
  let userFinderServiceMock: UserFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTeaService,
        {
          provide: PrismaService,
          useValue: {
            tea: {
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
      ],
    }).compile();

    createTeaService = module.get<CreateTeaService>(CreateTeaService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    userFinderServiceMock = module.get<UserFinderService>(UserFinderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create tea successfully', async () => {
    const userId = 1;
    const createTeaData = {
      name: 'Green Tea',
      isInTeabag: true,
      tempMin: 70,
      tempMax: 85,
      countryId: 1,
      timeMin: 3,
      timeMax: 5,
      isBio: true,
      tips: 'Test tips',
      theine: 20,
      isFavorite: false,
    };

    jest.spyOn(userFinderServiceMock, 'findUserById').mockResolvedValue({
      id: userId,
      name: 'Test User',
      mail: 'testuser@example.com',
      password: 'hashedpassword',
      urlImage: 'http://example.com/user.jpg',
      expiredAt: new Date(),
      stripeCustomerId: 'cus_test',
    });

    jest.spyOn(prismaServiceMock.tea, 'create').mockResolvedValue({
      id: 1,
      ...createTeaData,
      userId,
      date: new Date(),
    });

    const result = await createTeaService.createTea(createTeaData, userId);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...createTeaData,
        userId,
      }),
    );
  });
});
