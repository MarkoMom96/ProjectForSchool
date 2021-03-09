import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionAnswer } from './question-answer.entity';
import { Test } from './test.entity';
import * as Validator from 'class-validator';

@Index('fk_question_test_id', ['testId'], {})
@Entity('question')
export class Question {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'question_id',
    unsigned: true,
  })
  questionId: number;

  @Column({
    type: 'int',
    name: 'test_id',
    unsigned: true,
  })
  testId: number;

  @Column({
    type: 'varchar',
    name: 'question_name',
    length: 512,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  questionName: string;

  @Column({
    type: 'int',
    name: 'number_of_correct_answers',
    unsigned:true
  })
  @Validator.IsNotEmpty()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0

  })
  numberOfCorrectAnswers: number;

  @OneToMany(
    () => QuestionAnswer,
    questionAnswer => questionAnswer.question,
  )
  questionAnswers: QuestionAnswer[];

  @ManyToOne(
    () => Test,
    test => test.questions,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'test_id', referencedColumnName: 'testId' }])
  test: Test;
}
