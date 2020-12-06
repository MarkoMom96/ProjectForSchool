import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "src/entities/question.entity";
import { resolve } from "dns";
import { ApiResponse } from "src/controllers/misc/api.response.class";


@Injectable()
export class QuestionService extends TypeOrmCrudService<Question>{
    constructor( 
        @InjectRepository(Question)
        private readonly question: Repository<Question>){
            super(question);
     }

     async getQuestionsForTest(testId: number): Promise<Question[] | ApiResponse>  {
        const questionsForTest : Question[] = await this.question.find({testId:testId});

        if(questionsForTest.length === 0) {
            return new Promise( resolve=>{
                resolve(new ApiResponse("error", -4001, "No qustions found for given test"))
        })
        }
        return questionsForTest.sort(() => Math.random() - 0.5);
     
}

}