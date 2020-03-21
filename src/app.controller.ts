import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

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

  @Post('auth/register')
  async register(@Request() req) {
    console.log(req.body);
    this.authService.register(req.body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
