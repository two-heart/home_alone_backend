import { Injectable } from '@nestjs/common';
import { IUser } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      id: '1',
      email: 'john',
      password: bcrypt.hashSync('changeme', 10),
    },
  ];
  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }
}
