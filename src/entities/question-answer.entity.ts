import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

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
    length: 64,
  })
  answerName: string;

  @Column({
    type: 'tinyint',
    name: 'is_correct_answer',
    unsigned: true,
    default: () => "'0'",
  })
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
