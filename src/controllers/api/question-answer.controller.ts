import { Controller, Get, Param } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { QuestionAnswer } from "entities/question-answer.entity";
import { QuestionAnswerService } from "src/services/question-answer/question-answer.service";
import { ApiResponse } from "../misc/api.response.class";

@Controller('api/question-answer')
@Crud({
    model: {
        type: QuestionAnswer
    },
    params: {
        id : {
            field: 'questionAnswerId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            question:{
                eager: true
            }          
        }  
    }
})
export class QuestionAnswerController {
    constructor( public service: QuestionAnswerService ){
    }



@Get("question/:id") // GET http://localhost:3000/api/question-answer/question/id
getAllAnswersForQuestion(@Param('id') questionId : number) : Promise<QuestionAnswer[] | ApiResponse> {
    return this.service.getAllAnswersForQuestion(questionId);
} 

}