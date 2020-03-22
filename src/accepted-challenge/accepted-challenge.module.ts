import { Module } from '@nestjs/common';
import { AcceptedChallengeController } from './accepted-challenge.controller';
import { AcceptedChallengeService } from './accepted-challenge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptedChallenge } from './accepted-challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcceptedChallenge])],
  controllers: [AcceptedChallengeController],
  providers: [AcceptedChallengeService],
  exports: [AcceptedChallengeService],
})
export class AcceptedChallengeModule {}
