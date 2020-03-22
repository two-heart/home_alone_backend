import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AcceptedChallenge } from './accepted-challenge.entity';
import { AcceptedChallengeService } from './accepted-challenge.service';

@ApiTags('user')
@Controller('user/challenge/accepted')
export class AcceptedChallengeController {
  constructor(private acceptedChallengeService: AcceptedChallengeService) {}

  @ApiOkResponse({ type: AcceptedChallenge, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() request) {
    console.log(request.user);
    return await this.acceptedChallengeService.findByUserId(
      request.user.userId,
    );
  }
}
