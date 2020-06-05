import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Index('uq_professor_username', ['username'], { unique: true })
@Entity()
export class Professor {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'professor_id',
    unsigned: true,
  })
  professorId: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 32,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password_hash',
    length: 128,
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  forename: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  surname: string;

  @OneToMany(
    () => Test,
    test => test.professor,
  )
  tests: Test[];
}
