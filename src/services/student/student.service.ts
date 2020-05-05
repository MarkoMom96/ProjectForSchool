import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { async } from 'rxjs/internal/scheduler/async';
import { Student } from 'entities/student.entity';
import { AddStudentDto } from 'src/dtos/student/add.student.dto';
import { EditStudentDto } from 'src/dtos/student/edit.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly student: Repository<Student>,
  ) {}

  getAll(): Promise<Student[]> {
    return this.student.find();
  }

  getById(id: number): Promise<Student | ApiResponse> {
    
    return new Promise(async resolve => {
        const student = await this.student.findOne(id);

        if (student === undefined) {
          resolve(new ApiResponse('error', -2002, "Student with that id doesn't exist."));
        }
        resolve(student);

    });
    
    

  }

  // DTO -> Model(Entity)
  add(data: AddStudentDto): Promise<Student | ApiResponse> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    const newStudent = new Student();
    newStudent.username = data.username;
    newStudent.passwordHash = passwordHashString;
    newStudent.forename = data.forename;
    newStudent.surname = data.surname;
    newStudent.index = data.index;

    return new Promise(resolve => {
      this.student
      .save(newStudent)
      .then(data => resolve(data))
      .catch(error => {
          resolve(new ApiResponse('error', -2001, 'Username already exists.'))
        });
    });
  }

  async editByid(idNumber: number, data: EditStudentDto): Promise<Student | ApiResponse> {
    const currentStudent: Student = await this.student.findOne(idNumber);

    if (currentStudent === undefined) {
      return new Promise(resolve => {
          resolve(new ApiResponse('error', -1002, "Student with that id doesn't exist."))
      });
    }

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    currentStudent.passwordHash = passwordHashString;
    return this.student.save(currentStudent);
  }

  //Functions to add: add, editById
}
