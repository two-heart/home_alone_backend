import { Test, TestingModule } from '@nestjs/testing';
import { SyncService } from './sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Challenge } from '../challenge/challenge.entity';

describe('SyncService', () => {
  let service: SyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncService],
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Category, Challenge]),
      ],
    }).compile();

    service = module.get<SyncService>(SyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run sync without error', async () => {
    await service.sync(false);
  }, 40000);
});
