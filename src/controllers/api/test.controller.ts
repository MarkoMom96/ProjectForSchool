import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Test } from 'src/entities/test.entity';
import { TestService } from 'src/services/test/test.service';
import { AllowToRoles } from '../misc/allow.to.roles.descriptor';
import { RoleCheckerGuard } from '../misc/role.checker.guard';

@Controller('api/test')
@Crud({
  model: {
    type: Test,
  },
  params: {
    id: {
      field: 'testId',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      professor: {
        eager: true,
        exclude: ['passwordHash'],
      },
      students: {
        eager: true,
        exclude: ['passwordHash'],
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
    getManyBase: {
      decorators: [
        UseGuards(RoleCheckerGuard),
        AllowToRoles('professor', 'student'),
      ],
    },
    getOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
    createOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
    updateOneBase: {
      decorators: [UseGuards(RoleCheckerGuard), AllowToRoles('professor')],
    },
  },
})
export class TestController {
  constructor(public service: TestService) {}
}
