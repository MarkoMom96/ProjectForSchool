import { Controller, } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FinishedTest } from "src/entities/finished-test.entity";
import { FinishedTestService } from "src/services/finished-test/finished-test.service";

@Controller('api/finished-test/') 
@Crud({
    model: {
        type: FinishedTest  
    },
    params: {
        id : {
            field: 'finishedTestId',
            type: 'number',
            primary: true
        } 
    },
    query:{
        join: {
            student: {
                eager: true,
                exclude: ['passwordHash']
            },
            test:{
                eager: true
            },
            question: {
                eager: true
            }
        }       
    }
})
export class FinishedTestController {
    constructor( public service: FinishedTestService ){
    }
}