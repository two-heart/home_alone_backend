import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export interface IUser {
  id: string;
  email: string;
  password: string;
}

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;
}
