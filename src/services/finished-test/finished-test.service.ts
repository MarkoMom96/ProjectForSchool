import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FinishedTest } from "entities/finished-test.entity";


@Injectable()
export class FinishedTestService extends TypeOrmCrudService<FinishedTest>{
    constructor( 
        @InjectRepository(FinishedTest)
        private readonly finishedTest: Repository<FinishedTest>){
            super(finishedTest);
     }

}