import { Controller, Get, Param, Put, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { ProfessorService } from 'src/services/professor/professor.service';
import { Professor } from 'src/entities/professor.entity';
import { AddProfessorDto } from 'src/dtos/professor/add.professor.dto';
import { EditProfessorDto } from 'src/dtos/professor/edit.professor.dto';
import { ApiResponse } from '../misc/api.response.class';
import { AllowToRoles } from '../misc/allow.to.roles.descriptor';
import { RoleCheckerGuard } from '../misc/role.checker.guard';

@Controller('api/professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get() // GET http://localhost:3000/api/professor/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles("professor")
  getAll(): Promise<Professor[]> {
    return this.professorService.getAll();
  }
  @Get(':id') // GET http://localhost:3000/api/professor:id/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles("professor")
  getById(@Param('id') idNumber: number): Promise<Professor | ApiResponse> {
    return this.professorService.getById(idNumber);
  }

  @Post() //  POST http://localhost:3000/api/professor/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles("professor")
  addNew(@Body() data: AddProfessorDto): Promise<Professor | ApiResponse> {
    return this.professorService.add(data);
  }
  //add editBy
  @Patch(':id') // PATCH http://localhost:3000/api/professor/id/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles("professor")
  editById(
    @Param('id') idNumber: number,
    @Body() data: EditProfessorDto,
  ): Promise<Professor | ApiResponse> {
    return this.professorService.editByid(idNumber, data);
  }
}
