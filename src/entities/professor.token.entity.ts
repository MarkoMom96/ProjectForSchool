import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  
} from 'typeorm';
import * as Validator from 'class-validator';
import { IsString } from 'class-validator';

@Index('fk_professor_token_professor_id', ['professorId'], {})
@Entity('professor_token')
export class ProfessorToken {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'professor_token_id',
    unsigned: true,
  })
  professorTokenId: number;

  @Column({
    type: 'int',
    name: 'professor_id',
    unsigned: true,
  })
  professorId: number;

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
