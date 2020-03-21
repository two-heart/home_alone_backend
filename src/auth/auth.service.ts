import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
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
