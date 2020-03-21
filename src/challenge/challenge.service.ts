import { Challenge } from './challenge.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }

  findById(id: string): Promise<Challenge | undefined> {
    return this.challengeRepository.findOne(id);
  }

  findChallengesBySubscribedCategoriesOfUser(
    userId: string,
  ): Promise<Challenge[]> {
    return this.challengeRepository
      .createQueryBuilder('challenge')
      .innerJoinAndSelect('challenge.category', 'category')
      .innerJoinAndSelect(
        'user_subscribed_category',
        'usc',
        'usc.categoryId = category.id',
      )
      .where('usc.userId = :userId', { userId })
      .getMany();
  }
}
