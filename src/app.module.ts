import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ChallengeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
