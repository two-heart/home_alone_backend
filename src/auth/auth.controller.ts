import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';

import {
  ApiProperty,
  ApiCreatedResponse,
  ApiResponseProperty,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  displayedName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  plainPassword: string;
}

export class LoginUserDto {
  @ApiProperty({})
  username: string;
  @ApiProperty()
  password: string;
}

export class TokenResponse {
  @ApiResponseProperty()
  accessToken: '';
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({
    description: 'Logins the user',
    type: TokenResponse,
  })
  @Post('login')
  async login(@Request() req, @Body() loginUserInput: LoginUserDto) {
    console.log(req.user);
    return this.authService.generateToken(req.user);
  }

  @ApiCreatedResponse({
    description: 'registers a new user',
    type: TokenResponse,
  })
  @Post('register')
  async register(@Body() registerUserInput: RegisterUserDto) {
    const newUser = await this.authService.register(registerUserInput);
    return this.authService.generateToken(newUser);
  }
}
