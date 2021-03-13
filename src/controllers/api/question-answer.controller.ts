import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { QuestionAnswer } from 'src/entities/question-answer.entity';
import { QuestionAnswerService } from 'src/services/question-answer/question-answer.service';
import { AllowToRoles } from '../misc/allow.to.roles.descriptor';
import { ApiResponse } from '../misc/api.response.class';
import { RoleCheckerGuard } from '../misc/role.checker.guard';

@Controller('api/question-answer')
@Crud({
  model: {
    type: QuestionAnswer,
  },
  params: {
    id: {
      field: 'questionAnswerId',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      question: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
    getManyBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
    getOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
    createOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
    updateOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
  },
})
export class QuestionAnswerController {
  constructor(public service: QuestionAnswerService) {}

  @Get('question/:id') // GET http://localhost:3000/api/question-answer/question/id
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor')
  getAllAnswersForQuestion(
    @Param('id') questionId: number,
  ): Promise<QuestionAnswer[] | ApiResponse> {
    return this.service.getAllAnswersForQuestion(questionId);
  }
}
