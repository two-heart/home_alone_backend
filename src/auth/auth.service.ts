import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user === undefined) return null;
    try {
      const { password, ...result } = user;
      if (await bcrypt.compare(pass, password)) {
        return result;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async generateToken(user: IUser) {
    const payload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
