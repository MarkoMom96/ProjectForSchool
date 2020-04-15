import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FinishedTest } from './finished-test.entity';

@Index('uq_student_username', ['username'], { unique: true })
@Index('uq_student_index', ['index'], { unique: true })
@Entity('student')
export class Student {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'student_id',
    unsigned: true,
  })
  studentId: number;

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

  @Column({
    type: 'char',
    unique: true,
    length: 10,
  })
  index: string;

  @OneToMany(
    () => FinishedTest,
    finishedTest => finishedTest.student,
  )
  finishedTests: FinishedTest[];
}
