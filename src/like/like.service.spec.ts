import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "./like.entity";
import { LikeService } from "./like.service";

describe('LikeService', () => {
    let service: LikeService;

    const mockLikeRepository = {
        save: jest.fn().mockImplementation((like: Like) => Promise.resolve(like)),
        update: jest.fn().mockImplementation((id, data) => ({id, ...data})),
        find: jest.fn().mockImplementation(() => Promise.resolve([])),
        findOne: jest.fn().mockImplementation((id) => Promise.resolve({
            postId: 1,
            userId: 1,
        }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LikeService, {
                provide: getRepositoryToken(Like),
                useValue: mockLikeRepository
            }],
        }).compile();

        service = module.get<LikeService>(LikeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new like', async () => {
        const data = {
            postId: 1,
            userId: 1,
        }

        const savedLike = await service.create(data);
        expect(savedLike).toBeDefined();
    });
})
