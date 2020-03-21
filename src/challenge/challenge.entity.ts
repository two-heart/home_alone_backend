import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../category/category.entity';

@Entity({ name: 'challenge' })
export class Challenge {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  teaser: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 300, default: undefined })
  imageUrl?: string;

  @ApiProperty({ type: () => Category })
  @ManyToOne(
    type => Category,
    category => category.challenges,
    { eager: true },
  )
  category: Category;
}
