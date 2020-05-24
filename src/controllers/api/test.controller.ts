import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Test } from "entities/test.entity";
import { TestService } from "src/services/test/test.service";

@Controller('api/test')
@Crud({
    model: {
        type: Test
    },
    params: {
        id : {
            field: 'testId',
            type: 'number',
            primary: true
        }
    },  
    query: {
        join: {
            professor: {
                eager: true,
                exclude: ['passwordHash']   
            },
            students: {
                eager: true,
                exclude: ['passwordHash'] 
            }
        }
    },
 
    
})
export class TestController {
    constructor( public service: TestService){

    }
}