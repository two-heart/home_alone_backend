import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { AcceptedChallenge } from '../accepted-challenge/accepted-challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, AcceptedChallenge])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
