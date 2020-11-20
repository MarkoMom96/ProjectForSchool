import { Controller, UseGuards, } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FinishedTest } from "src/entities/finished-test.entity";
import { FinishedTestService } from "src/services/finished-test/finished-test.service";
import { AllowToRoles } from "../misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "../misc/role.checker.guard";

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
                eager: true,
            },
         
        }   
    },
    routes: {
        only: [
           "getManyBase",
           "getOneBase",
           "createOneBase",
           "updateOneBase" 
            
        ],
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("professor")
            ]
        },
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("professor")
            ]
        },
        createOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("professor")
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("professor")
            ]
        }
    }       
    
    })
export class FinishedTestController {
    constructor( public service: FinishedTestService ){
    }
}