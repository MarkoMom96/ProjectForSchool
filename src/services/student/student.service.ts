import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { async } from 'rxjs/internal/scheduler/async';
import { Student } from 'src/entities/student.entity';
import { AddStudentDto } from 'src/dtos/student/add.student.dto';
import { EditStudentDto } from 'src/dtos/student/edit.student.dto';
import { StudentToken } from 'src/entities/student.token.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly student: Repository<Student>,
    @InjectRepository(StudentToken)
    private readonly studentToken: Repository<StudentToken>,
  ) {}

  getAll(): Promise<Student[]> {
    return this.student.find({
      relations: ['studentTests', 'finishedTests'],
      select: ['studentId', 'username', 'forename', 'surname'],
    });
  }

  getById(id: number): Promise<Student | ApiResponse> {
    return new Promise(async resolve => {
      const student = await this.student.findOne(id, {
        select: ['studentId', 'username', 'forename', 'surname'],
      });

      if (student === undefined) {
        resolve(
          new ApiResponse(
            'error',
            -2002,
            "Student with that id doesn't exist.",
          ),
        );
      }
      resolve(student);
    });
  }

  async getByUsername(givenUsername: string): Promise<Student | null> {
    const student = await this.student.findOne({
      username: givenUsername,
    });
    console.log('arg: ', givenUsername);
    console.log('Student:', student);
    if (student) {
      return student;
    }
    return null;
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

    return new Promise(resolve => {
      this.student
        .save(newStudent)
        .then(data => resolve(data))
        .catch(error => {
          resolve(new ApiResponse('error', -2001, 'Username already exists.'));
        });
    });
  }

  async editByid(
    idNumber: number,
    data: EditStudentDto,
  ): Promise<Student | ApiResponse> {
    const currentStudent: Student = await this.student.findOne(idNumber);

    if (currentStudent === undefined) {
      return new Promise(resolve => {
        resolve(
          new ApiResponse(
            'error',
            -1002,
            "Student with that id doesn't exist.",
          ),
        );
      });
    }

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    currentStudent.passwordHash = passwordHashString;
    return this.student.save(currentStudent);
  }

  async addToken(studentId: number, token: string, expiresAt: string) {
    const userToken = new StudentToken();
    userToken.studentId = studentId;
    userToken.token = token;
    userToken.expiresAt = expiresAt;

    return await this.studentToken.save(userToken);
  }

  async getStudentToken(token: string): Promise<StudentToken> {
    return await this.studentToken.findOne({
      token: token,
    });
  }
  async invalidateToken(token: string): Promise<StudentToken | ApiResponse> {
    const studentToken = await this.studentToken.findOne({
      token: token,
    });
    if (!studentToken)
      return new ApiResponse('error', -10001, 'Token nije pronadjen');

    studentToken.isValid = 0;
    await this.studentToken.save(studentToken);

    return await this.getStudentToken(token);
  }
  async invalidateStudentTokens(
    studentId: number,
  ): Promise<(StudentToken | ApiResponse)[]> {
    const studentTokens = await this.studentToken.find({
      studentId: studentId,
    });
    const results = [];
    for (const studentToken of studentTokens) {
      results.push(this.invalidateToken(studentToken.token));
    }
    return results;
  }
}
