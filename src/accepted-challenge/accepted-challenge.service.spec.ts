import { Test, TestingModule } from '@nestjs/testing';
import { AcceptedChallengeService } from './accepted-challenge.service';

describe('AcceptedChallengeService', () => {
  let service: AcceptedChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptedChallengeService],
    }).compile();

    service = module.get<AcceptedChallengeService>(AcceptedChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
