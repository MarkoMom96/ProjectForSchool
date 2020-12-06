import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { FinishedTest } from './finished-test.entity';
import { Question } from './question.entity';
import { Professor } from './professor.entity';
import { Student } from './student.entity';

@Index('fk_test_professor_id', ['professorId'], {})
@Entity('test')
export class Test {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'test_id',
    unsigned: true,
  })
  testId: number;

  @Column({
    type: 'varchar',
    name: 'test_name',
    length: 64,
  })
  testName: string;

  @Column({
    type: 'int',
    name: 'professor_id',
    unsigned: true,
  })
  professorId: number;

  @Column({
    type: 'smallint',
    name: 'is_active',
    unsigned: true,
  })
  isActive: number;

  @OneToMany(
    () => FinishedTest,
    finishedTest => finishedTest.test,
  )
  finishedTests: FinishedTest[];

  @ManyToMany(type => Student, student => student.studentTests)
  @JoinTable({
    name: 'finished_test',
    joinColumn: { name: "test_id", referencedColumnName: "testId" },
    inverseJoinColumn: { name: "student_id", referencedColumnName: "studentId"} 
  })
  students: Student[];


  @OneToMany(
    () => Question,
    question => question.test,
  )
  questions: Question[];

  @ManyToOne(
    () => Professor,
    professor => professor.tests,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'professor_id', referencedColumnName: 'professorId' }])
  professor: Professor;
}
