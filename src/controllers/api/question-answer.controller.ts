import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { QuestionAnswer } from "entities/question-answer.entity";
import { QuestionAnswerService } from "src/services/question-answer/question-answer.service";

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
}