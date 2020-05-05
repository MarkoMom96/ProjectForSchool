import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Question } from "entities/question.entity";
import { QuestionService } from "src/services/question/question.service";

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
}