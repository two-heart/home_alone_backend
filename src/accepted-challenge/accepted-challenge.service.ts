import { Injectable } from '@nestjs/common';
import { AcceptedChallenge } from './accepted-challenge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AcceptedChallengeService {
  constructor(
    @InjectRepository(AcceptedChallenge)
    private repository: Repository<AcceptedChallenge>,
  ) {}

  findByUserId(userId: string): Promise<AcceptedChallenge[]> {
    return this.repository.find({ where: { userId } });
  }

  async createAcceptedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<AcceptedChallenge> {
    const savedAcceptedChallenge = await this.repository.save({
      userId,
      challengeId,
      finished: false,
    });
    return this.repository.findOne({ where: savedAcceptedChallenge });
  }

  async finishAcceptedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<AcceptedChallenge> {
    const savedAcceptedChallenge = await this.repository.update(
      { userId, challengeId, finished: false },
      {
        finished: true,
        finishedAt: new Date(),
      },
    );
    return this.repository.findOne({ where: savedAcceptedChallenge });
  }
}
