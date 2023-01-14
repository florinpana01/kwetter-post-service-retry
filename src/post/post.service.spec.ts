import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { PostService } from "./post.service";


describe('PostService', () => {
    let service: PostService;

    const mockPostRepository = {
        save: jest.fn().mockImplementation((post: Post) => Promise.resolve(post)),
        update: jest.fn().mockImplementation((id, data) => ({id, ...data})),
        find: jest.fn().mockImplementation(() => Promise.resolve([])),
        findOne: jest.fn().mockImplementation((id) => Promise.resolve({
            userId: 1,
            content: "test post",
        }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService, {
                provide: getRepositoryToken(Post),
                useValue: mockPostRepository
            }],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new post', async () => {
        const data = {
            userId: 1,
            content: "test post",
        }

        const savedPost = await service.create(data);
        expect(savedPost).toBeDefined();
    });
})
