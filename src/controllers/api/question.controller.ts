import { Controller, Param, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Question } from "src/entities/question.entity";
import { QuestionService } from "src/services/question/question.service";
import { ApiResponse } from "../misc/api.response.class";

@Controller('api/question')
@Crud({
    model: {
        type: Question
    },
    params: {
        id : {
            field: 'questionId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            test:{
                eager: true
            },
            professor: {
                eager: true
            }
        }

           
        }
})
export class QuestionController {
    constructor( public service: QuestionService ){

    }

  @Get('/test/:id') 
  getQuestionsForTest(@Param('id') testId: number ): Promise<Question[] | ApiResponse> {
    return this.service.getQuestionsForTest(testId);    
  }
}