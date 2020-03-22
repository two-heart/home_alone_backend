import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { CategoryModule } from './category/category.module';
import { AcceptedChallengeModule } from './accepted-challenge/accepted-challenge.module';
import { SyncService } from './sync/sync.service';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ChallengeModule,
    AuthModule,
    UserModule,
    CategoryModule,
    AcceptedChallengeModule,
    SyncModule,
  ],
  controllers: [AppController],
  providers: [AppService, SyncService],
})
export class AppModule {}
