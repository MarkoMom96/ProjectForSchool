import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { ApiResponse } from '../misc/api.response.class';
import { Student } from 'entities/student.entity';
import { StudentService } from 'src/services/student/student.service';
import { EditStudentDto } from 'src/dtos/student/edit.student.dto';
import { AddStudentDto } from 'src/dtos/student/add.student.dto';

@Controller('api/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get() // GET http://localhost:3000/api/professor/
  getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }
  @Get(':id') // GET http://localhost:3000/api/professor:id/
  getById(@Param('id') idNumber: number): Promise<Student | ApiResponse> {
    return this.studentService.getById(idNumber);
  }

  @Put() //  PUT http://localhost:3000/api/professor/
  addNew(@Body() data: AddStudentDto): Promise<Student | ApiResponse> {
    return this.studentService.add(data);
  }
  //add editBy
  @Post(':id') // http://localhost:3000/api/professor/id/
  editById(
    @Param('id') idNumber: number,
    @Body() data: EditStudentDto,
  ): Promise<Student | ApiResponse> {
    return this.studentService.editByid(idNumber, data);
  }
}