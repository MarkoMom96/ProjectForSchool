import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionAnswer } from "entities/question-answer.entity";


@Injectable()
export class QuestionAnswerService extends TypeOrmCrudService<QuestionAnswer>{
    constructor( 
        @InjectRepository(QuestionAnswer)
        private readonly questionAnswer: Repository<QuestionAnswer>){
            super(questionAnswer);
     }

}