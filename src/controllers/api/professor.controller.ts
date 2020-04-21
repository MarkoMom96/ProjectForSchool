import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { ProfessorService } from 'src/services/professor/professor.service';
import { Professor } from 'entities/professor.entity';
import { AddProfessorDto } from 'src/dtos/professor/add.professor.dto';
import { EditProfessorDto } from 'src/dtos/professor/edit.professor.dto';
import { ApiResponse } from '../misc/api.response.class';

@Controller('api/professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get() // GET http://localhost:3000/api/professor/
  getAll(): Promise<Professor[]> {
    return this.professorService.getAll();
  }
  @Get(':id') // GET http://localhost:3000/api/professor:id/
  getById(@Param('id') idNumber: number): Promise<Professor | ApiResponse> {
    return this.professorService.getById(idNumber);
  }

  @Put() //  PUT http://localhost:3000/api/professor/
  addNew(@Body() data: AddProfessorDto): Promise<Professor | ApiResponse> {
    return this.professorService.add(data);
  }
  //add editBy
  @Post(':id') // http://localhost:3000/api/professor/id/
  editById(
    @Param('id') idNumber: number,
    @Body() data: EditProfessorDto,
  ): Promise<Professor | ApiResponse> {
    return this.professorService.editByid(idNumber, data);
  }
}
