import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { Controller, Get } from '@nestjs/common';

@Controller('challenge')
export class ChallengeController {
  constructor(private challengeProvider: ChallengeService) {}

  @Get()
  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeProvider.findAll();
    return challenges;
  }
}
