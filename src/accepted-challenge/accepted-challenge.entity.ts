import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Challenge } from '../challenge/challenge.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Category } from '../category/category.entity';

@Unique(['userId', 'challengeId'])
@Entity({ name: 'accepted_challenge' })
export class AcceptedChallenge {
  @Index()
  @Column({ default: false })
  finished: boolean;
  @Column({ default: undefined, nullable: true })
  finishedAt?: Date;
  @CreateDateColumn()
  acceptedAt?: Date;

  @Exclude()
  @PrimaryColumn()
  userId: string;
  @Exclude()
  @PrimaryColumn()
  challengeId: string;

  @ManyToOne(
    type => User,
    user => user.acceptedChallenges,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  user: User;

  @ManyToOne(type => Challenge, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  challenge: Challenge;
}

export type IUserChallenge = Partial<Challenge> & Partial<AcceptedChallenge>;

export class UserChallenge implements IUserChallenge {
  @ApiProperty()
  id: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  teaser: string;
  @ApiProperty({ type: () => Category })
  category: Category;

  @ApiPropertyOptional()
  acceptedAt: Date;
  @ApiPropertyOptional()
  finished: boolean;
  @ApiPropertyOptional()
  finishedAt: Date;
}
