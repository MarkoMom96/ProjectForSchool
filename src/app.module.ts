import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Professor } from 'entities/professor.entity';
import { ProfessorService } from './services/professor/professor.service';
import { FinishedTest } from 'entities/finished-test.entity';
import { QuestionAnswer } from 'entities/question-answer.entity';
import { Question } from 'entities/question.entity';
import { Student } from 'entities/student.entity';
import { Test } from 'entities/test.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        FinishedTest,
        Professor,
        QuestionAnswer,
        Question,
        Student,
        Test,
      ],
    }),
    TypeOrmModule.forFeature([Professor]),
  ],
  controllers: [AppController],
  providers: [ProfessorService],
})
export class AppModule {}
