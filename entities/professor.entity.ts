import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn({
    name: 'professor_id',
    type: 'int',
    unsigned: true,
  })
  professorId: number;

  @Column({
    type: 'varchar',
    length: '32',
    unique: true,
  })
  username: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: '128',
    unique: true,
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: '32',
  })
  forename: string;

  @Column({
    type: 'varchar',
    length: '32',
  })
  surname: string;
}
