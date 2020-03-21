import { User } from './user.entity';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChallengeService } from '../challenge/challenge.service';
import { Challenge } from '../challenge/challenge.entity';
import { Category } from '../category/category.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private challengeService: ChallengeService,
  ) {}
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @ApiOkResponse({
    type: Challenge,
    isArray: true,
    description: 'All challenges in the subscribed categories of the user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('challenge')
  async findByCategoriesOfCurrentUser(@Request() request) {
    return this.challengeService.findChallengesBySubscribedCategoriesOfUser(
      request.user.userId,
    );
  }

  @ApiOkResponse({
    type: Category,
    isArray: true,
    description: 'Subscribed categories',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('category')
  async findSubscribedCategories(@Request() request) {
    const user = await this.userService.findByUserId(request.user.id);
    return await user.subscribedCategories;
  }
}
