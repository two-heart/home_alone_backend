import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUser, User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }
  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }
  async findByUserId(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne(userId);
  }
}
