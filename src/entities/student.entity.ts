import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Test } from './test.entity';
import { FinishedTest } from './finished-test.entity';
import * as Validator from 'class-validator';


@Index('uq_student_username', ['username'], { unique: true })
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
    length: 10,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[0-9]{10}$/)
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
  @Validator.Length(3,32)
  forename: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  @Validator.IsNotEmpty()
  @Validator.Length(3,32)
  surname: string;


  @OneToMany(
    () => FinishedTest,
    finishedTest => finishedTest.student,
  )
  finishedTests: FinishedTest[];


@ManyToMany(type => Test, test => test.students)
@JoinTable({
  name: 'finished_test',
  joinColumn: { name: "student_id", referencedColumnName: "studentId" },
  inverseJoinColumn: { name: "test_id", referencedColumnName: "testId"} 
})
studentTests: Test[];

}