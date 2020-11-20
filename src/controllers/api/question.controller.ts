import { Controller, Param, Get, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Question } from "src/entities/question.entity";
import { QuestionService } from "src/services/question/question.service";
import { AllowToRoles } from "../misc/allow.to.roles.descriptor";
import { ApiResponse } from "../misc/api.response.class";
import { RoleCheckerGuard } from "../misc/role.checker.guard";

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
export class QuestionController {
    constructor( public service: QuestionService ){

    }

  @Get('/test/:id') 
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles("professor")
  getQuestionsForTest(@Param('id') testId: number ): Promise<Question[] | ApiResponse> {
    return this.service.getQuestionsForTest(testId);    
  }
}