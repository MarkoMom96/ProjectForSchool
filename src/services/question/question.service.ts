import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "entities/question.entity";


@Injectable()
export class QuestionService extends TypeOrmCrudService<Question>{
    constructor( 
        @InjectRepository(Question)
        private readonly question: Repository<Question>){
            super(question);
     }

}