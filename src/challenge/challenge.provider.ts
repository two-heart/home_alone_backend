import { Challenge } from './challenge.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeProvider {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }
}
