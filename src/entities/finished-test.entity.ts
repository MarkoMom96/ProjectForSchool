import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Test } from './test.entity';
import * as Validator from 'class-validator';

@Index('fk_finished_test_test_id', ['testId'], {})
@Index('fk_finished_test_student_id', ['studentId'], {})
@Entity('finished_test')
export class FinishedTest {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'finished_test_id',
    unsigned: true,
  })
  finishedTestId: number;

  @Column({
    type: 'int',
    name: 'test_id',
    unsigned: true,
  })
  testId: number;

  @Column({
    type: 'int',
    name: 'student_id',
    unsigned: true,
  })
  studentId: number;

  @Column({
    type: 'tinyint',
    name: 'is_passed',
    unsigned: true,
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0, 1])
  isPassed: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0, 100])
  score: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(
    () => Student,
    student => student.finishedTests,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'studentId' }])
  student: Student;

  @ManyToOne(
    () => Test,
    test => test.finishedTests,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'test_id', referencedColumnName: 'testId' }])
  test: Test;
}
