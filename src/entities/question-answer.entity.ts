import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import * as Validator from 'class-validator';

@Index('fk_question_answer_question_id', ['questionId'], {})
@Entity('question_answer')
export class QuestionAnswer {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'question_answer_id',
    unsigned: true,
  })
  questionAnswerId: number;

  @Column({
    type: 'int',
    name: 'question_id',
    unsigned: true,
  })
  questionId: number;

  @Column({
    type: 'varchar',
    name: 'answer_name',
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  answerName: string;

  @Column({
    type: 'tinyint',
    name: 'is_correct_answer',
    unsigned: true,
    default: () => "'0'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0,1])
  isCorrectAnswer: number;

  @ManyToOne(
    () => Question,
    question => question.questionAnswers,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'questionId' }])
  question: Question;
}
