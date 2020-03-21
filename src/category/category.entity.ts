import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Challenge } from '../challenge/challenge.entity';

@Entity({ name: 'category' })
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @OneToMany(
    type => Challenge,
    challenge => challenge.category,
  )
  challenges: Challenge[];
}
