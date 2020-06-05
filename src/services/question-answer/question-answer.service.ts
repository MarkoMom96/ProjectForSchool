import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionAnswer } from "entities/question-answer.entity";
import { ApiResponse } from "src/controllers/misc/api.response.class";


@Injectable()
export class QuestionAnswerService extends TypeOrmCrudService<QuestionAnswer>{
    constructor( 
        @InjectRepository(QuestionAnswer)
        private readonly questionAnswer: Repository<QuestionAnswer>){
            super(questionAnswer);
     }



async getAllAnswersForQuestion(questionId : number) : Promise<QuestionAnswer[] | ApiResponse>{
    const allAnswers : QuestionAnswer[] = await this.questionAnswer.find();
    let answersForQuestion : QuestionAnswer[] = [];
   
 for (let answer of allAnswers){

     if(answer.questionId == questionId){
         
        answersForQuestion.push(answer);
     }
 }
 if(answersForQuestion.length === 0){
    return new Promise( resolve=>{
            resolve(new ApiResponse("error", -5001, "No answer found for given question"))
    });
 }
 return answersForQuestion.sort(() => Math.random() - 0.5);
}
}

