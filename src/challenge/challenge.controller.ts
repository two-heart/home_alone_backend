import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Controller('challenge')
export class ChallengeController {
  constructor(private challengeProvider: ChallengeService) {}

  @ApiOkResponse({
    type: Challenge,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeProvider.findAll();
    return challenges;
  }

  @ApiOkResponse({
    type: Challenge,
  })
  @ApiBadRequestResponse({
    description: 'Invalid id format',
  })
  @ApiNotFoundResponse({
    description: 'Challenge not found',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('id must be an uuid');
    }
    const challenge = await this.challengeProvider.findById(id);
    if (challenge === undefined) {
      throw new NotFoundException();
    }
    return challenge;
  }
}
