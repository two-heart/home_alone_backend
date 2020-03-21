import { Test, TestingModule } from '@nestjs/testing';
import { AcceptedChallengeController } from './accepted-challenge.controller';

describe('AcceptedChallenge Controller', () => {
  let controller: AcceptedChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcceptedChallengeController],
    }).compile();

    controller = module.get<AcceptedChallengeController>(AcceptedChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
