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

@Unique(['userId', 'challengeId'])
@Entity({ name: 'accepted_challenge' })
export class AcceptedChallenge {
  @ApiProperty()
  @Index()
  @Column({ default: false })
  finished: boolean;
  @ApiPropertyOptional()
  @Column({ default: undefined, nullable: true })
  finishedAt?: Date;
  @ApiProperty()
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

  @ApiProperty({ type: () => Challenge })
  @ManyToOne(type => Challenge, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  challenge: Challenge;
}
