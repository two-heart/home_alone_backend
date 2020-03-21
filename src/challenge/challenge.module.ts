import { Challenge } from './challenge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeProvider } from './challenge.provider';
import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengeController],
  providers: [ChallengeProvider],
})
export class ChallengeModule {}
