import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { AcceptedChallengeService } from '../accepted-challenge/accepted-challenge.service';
import { AcceptedChallenge } from '../accepted-challenge/accepted-challenge.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('challenge')
export class ChallengeController {
  constructor(
    private challengeProvider: ChallengeService,
    private acceptedChallengeService: AcceptedChallengeService,
  ) {}

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

  @ApiCreatedResponse({ type: AcceptedChallenge })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/accept')
  async acceptChallenge(@Request() request, @Param('id') challengeId: string) {
    return this.acceptedChallengeService.createAcceptedChallenge(
      request.user.userId,
      challengeId,
    );
  }

  @ApiCreatedResponse({ type: AcceptedChallenge })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/finish')
  async finishChallenge(@Request() request, @Param('id') challengeId: string) {
    return this.acceptedChallengeService.finishAcceptedChallenge(
      request.user.userId,
      challengeId,
    );
  }
}
