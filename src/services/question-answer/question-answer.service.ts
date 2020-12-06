import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionAnswer } from "src/entities/question-answer.entity";
import { ApiResponse } from "src/controllers/misc/api.response.class";


@Injectable()
export class QuestionAnswerService extends TypeOrmCrudService<QuestionAnswer>{
    constructor( 
        @InjectRepository(QuestionAnswer)
        private readonly questionAnswer: Repository<QuestionAnswer>){
            super(questionAnswer);
     }



async getAllAnswersForQuestion(questionId : number) : Promise<QuestionAnswer[] | ApiResponse>{
    const answersForQuestion : QuestionAnswer[] = await this.questionAnswer.find({questionId:questionId});

    if(answersForQuestion.length === 0) {
        return new Promise( resolve=>{
            resolve(new ApiResponse("error", -4002, "No answers found for given question"))
    })
    }
    return answersForQuestion.sort(() => Math.random() - 0.5);
}
}

