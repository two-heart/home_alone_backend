import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('challenge')
export class ChallengeController {
  constructor(private challengeProvider: ChallengeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeProvider.findAll();
    return challenges;
  }
}
