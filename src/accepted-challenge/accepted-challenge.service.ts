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
}
