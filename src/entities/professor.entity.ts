import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test.entity';
import * as Validator from 'class-validator';

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
    length: 64,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[a-z]{3,32}\.[a-z]{3}[0-9]{2}$/)
  username: string;

  @Column({
    type: 'varchar',
    name: 'password_hash',
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  @Validator.IsNotEmpty()
  @Validator.Length(3, 32)
  forename: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  @Validator.IsNotEmpty()
  @Validator.Length(3, 32)
  surname: string;

  @OneToMany(
    () => Test,
    test => test.professor,
  )
  tests: Test[];
}
