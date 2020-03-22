import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IUserChallenge, UserChallenge } from './accepted-challenge.entity';
import { AcceptedChallengeService } from './accepted-challenge.service';
import { classToClass } from 'class-transformer';

@ApiTags('user')
@Controller('user/challenge/accepted')
export class AcceptedChallengeController {
  constructor(private acceptedChallengeService: AcceptedChallengeService) {}

  @ApiOkResponse({ type: () => UserChallenge, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() request): Promise<IUserChallenge[]> {
    const acceptedChallenges = await this.acceptedChallengeService.findByUserId(
      request.user.userId,
    );
    return acceptedChallenges.map(acceptedChallenge => {
      const { challenge, ...other } = classToClass(acceptedChallenge);
      return {
        ...challenge,
        ...other,
      };
    });
  }
}
