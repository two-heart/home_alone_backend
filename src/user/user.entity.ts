import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { AcceptedChallenge } from '../accepted-challenge/accepted-challenge.entity';

export interface IUser {
  id: string;
  email: string;
  password: string;
}

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  displayedName: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @ManyToMany(type => Category)
  @JoinTable()
  subscribedCategories: Category[];

  @OneToMany(
    type => AcceptedChallenge,
    acceptedChallenge => acceptedChallenge.user,
  )
  public acceptedChallenges: Promise<AcceptedChallenge[]>;
}
