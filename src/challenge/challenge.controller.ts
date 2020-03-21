import { Challenge } from './challenge.entity';
import { ChallengeProvider } from './challenge.provider';
import { Controller, Get } from '@nestjs/common';

@Controller('challenge')
export class ChallengeController {
  constructor(private challengeProvider: ChallengeProvider) {}

  @Get()
  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeProvider.findAll();
    return challenges;
  }
}
