import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  
} from 'typeorm';
import * as Validator from 'class-validator';

@Index('fk_student_token_student_id', ['studentId'], {})
@Entity('student_token')
export class StudentToken {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'student_token_id',
    unsigned: true,
  })
  studentTokenId: number;

  @Column({
    type: 'int',
    name: 'student_id',
    unsigned: true,
  })
  studentId: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: string;

  @Column({
    type: 'text'
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  token: string

  @Column({
    type: 'datetime',
    name: 'expires_at',
  })
  expiresAt: string;

  @Column({
    type: 'tinyint',
    name: 'is_valid',
    unsigned: true,
    default: 1
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0, 1])
  isValid: number;
}
