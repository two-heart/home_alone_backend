import { User } from './user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChallengeService } from '../challenge/challenge.service';
import { Challenge } from '../challenge/challenge.entity';
import { Category } from '../category/category.entity';
import { IsUUID } from 'class-validator';

export class SubscribeCategoryDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class MultiSubscribeCategoryDto {
  @ApiProperty()
  categoryIds: string[];
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private challengeService: ChallengeService,
  ) {}

  @ApiOkResponse({
    type: User,
    description: 'current user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findCurrentUser(@Request() request): Promise<User> {
    return this.userService.findByUserId(request.user.userId);
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

  @ApiCreatedResponse({
    description:
      'Set subscripted categories. Overrides existing subscriptions.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('categories')
  async setSubscriptions(
    @Request() request,
    @Body() multiSubscribeCategoryDto: MultiSubscribeCategoryDto,
  ) {
    await this.userService.setSubscriptions(
      request.user.userId,
      multiSubscribeCategoryDto.categoryIds,
    );
  }

  @ApiCreatedResponse({ description: 'Subscribe to the given category' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('category')
  async subscribeCategory(
    @Request() request,
    @Body() subscribeCategoryDto: SubscribeCategoryDto,
  ) {
    await this.userService.subscribeToCategoryId(
      request.user.userId,
      subscribeCategoryDto.id,
    );
  }

  @ApiOkResponse({ description: 'Unsubscribe to the given category' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('category')
  async unsubscribeCategory(
    @Request() request,
    @Body() subscribeCategoryDto: SubscribeCategoryDto,
  ) {
    await this.userService.unsubscribeToCategoryId(
      request.user.userId,
      subscribeCategoryDto.id,
    );
  }
}
