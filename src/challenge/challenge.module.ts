import { Challenge } from './challenge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeService } from './challenge.service';
import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { AcceptedChallengeModule } from '../accepted-challenge/accepted-challenge.module';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge]), AcceptedChallengeModule],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
