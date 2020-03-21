import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import {
  ApiProperty,
  ApiCreatedResponse,
  ApiResponseProperty,
} from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  plainPassword: string;
}

export class RegisterUserResponse {
  @ApiResponseProperty()
  accessToken: '';
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.generateToken(req.user);
  }

  @ApiCreatedResponse({
    description: 'registers a new user',
    type: RegisterUserResponse,
  })
  @Post('auth/register')
  async register(@Body() registerUserInput: RegisterUserDto) {
    const newUser = await this.authService.register(registerUserInput);
    return this.authService.generateToken(newUser);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
