import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser, User } from '../user/user.entity';
import { RegisterUserDto } from '../app.controller';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async register(userInput: RegisterUserDto) {
    const user = new User();
    user.email = userInput.email;
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.password = bcrypt.hashSync(userInput.plainPassword, 10);
    return this.userRepository.save(user);
  }

  async generateToken(user: IUser) {
    const payload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
