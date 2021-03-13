import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '../misc/api.response.class';
import { Student } from 'src/entities/student.entity';
import { StudentService } from 'src/services/student/student.service';
import { EditStudentDto } from 'src/dtos/student/edit.student.dto';
import { AddStudentDto } from 'src/dtos/student/add.student.dto';
import { RoleCheckerGuard } from '../misc/role.checker.guard';
import { AllowToRoles } from '../misc/allow.to.roles.descriptor';

@Controller('api/student/')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get() // GET http://localhost:3000/api/student/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor', 'student') // remove student
  getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }
  @Get(':id') // GET http://localhost:3000/api/student:id/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor')
  getById(@Param('id') idNumber: number): Promise<Student | ApiResponse> {
    return this.studentService.getById(idNumber);
  }
  @Get('username/:username') // GET http://localhost:3000/api/student/username:username/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor', 'student')
  getByUsername(
    @Param(':username') username: string,
  ): Promise<Student | ApiResponse> {
    return this.studentService.getByUsername(username);
  }

  @Post() //  POST http://localhost:3000/api/studnet/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor')
  addNew(@Body() data: AddStudentDto): Promise<Student | ApiResponse> {
    return this.studentService.add(data);
  }
  //add editBy
  @Put(':id') // PUT http://localhost:3000/api/student/id/
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('professor')
  editById(
    @Param('id') idNumber: number,
    @Body() data: EditStudentDto,
  ): Promise<Student | ApiResponse> {
    return this.studentService.editByid(idNumber, data);
  }
}
