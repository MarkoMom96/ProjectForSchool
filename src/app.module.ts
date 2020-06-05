import { Module, NestModule, MiddlewareConsumer,  } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Professor } from 'src/entities/professor.entity';
import { ProfessorService } from './services/professor/professor.service';
import { FinishedTest } from 'src/entities/finished-test.entity';
import { QuestionAnswer } from 'src/entities/question-answer.entity';
import { Question } from 'src/entities/question.entity';
import { Student } from 'src/entities/student.entity';
import { Test } from 'src/entities/test.entity';
import { ProfessorController } from './controllers/api/professor.controller';
import { StudentService } from './services/student/student.service';
import { StudentController } from './controllers/api/student.controller';
import { TestController } from './controllers/api/test.controller';
import { TestService } from './services/test/test.service';
import { QuestionController } from './controllers/api/question.controller';
import { QuestionService } from './services/question/question.service';
import { QuestionAnswerController } from './controllers/api/question-answer.controller';
import { QuestionAnswerService } from './services/question-answer/question-answer.service';
import { FinishedTestController } from './controllers/api/finished-test.controller';
import { FinishedTestService } from './services/finished-test/finished-test.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

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
    TypeOrmModule.forFeature([
      Professor,
      Student,
      Test,
      Question,
      QuestionAnswer, 
      FinishedTest, 
    ]),
  ],
  controllers: [
    AppController, 
    ProfessorController, 
    StudentController,
    TestController,
    QuestionController,
    QuestionAnswerController,
    FinishedTestController,
    AuthController,
  ],
  providers: [
    ProfessorService,
    StudentService,
    TestService,
    QuestionService,
    QuestionAnswerService,
    FinishedTestService,

  ],
  exports: [
    ProfessorService, 
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("auth/*")
      .forRoutes("api/*");
  }

  
}
