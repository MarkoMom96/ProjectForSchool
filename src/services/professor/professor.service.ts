import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'entities/professor.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AddProfessorDto } from 'src/dtos/professor/add.professor.dto';
import { EditProfessorDto } from 'src/dtos/professor/edit.professor.dto';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professor: Repository<Professor>,
  ) {}

  getAll(): Promise<Professor[]> {
    return this.professor.find();
  }

  getById(id: number): Promise<Professor | ApiResponse> {
    
    return new Promise(async resolve => {
        const professor = await this.professor.findOne(id);

        if (professor === undefined) {
          resolve(new ApiResponse('error', -1002, "Professor with that id doesn't exist."));
        }
        resolve(professor);

    });
    
    

  }

  // DTO -> Model(Entity)
  add(data: AddProfessorDto): Promise<Professor | ApiResponse> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    const newProfessor = new Professor();
    newProfessor.username = data.username;
    newProfessor.passwordHash = passwordHashString;
    newProfessor.forename = data.forename;
    newProfessor.surname = data.surname;

    return new Promise(resolve => {
      this.professor
      .save(newProfessor)
      .then(data => resolve(data))
      .catch(error => {
          resolve(new ApiResponse('error', -1001, 'Username already exists.'))
        });
    });
  }
  async editByid(idNumber: number, data: EditProfessorDto): Promise<Professor | ApiResponse> {
    const currentProfessor: Professor = await this.professor.findOne(idNumber);

    if (currentProfessor === undefined) {
      return new Promise(resolve => {
          resolve(new ApiResponse('error', -1002, "Professor with that id doesn't exist."))
      });
    }

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    currentProfessor.passwordHash = passwordHashString;
    currentProfessor.forename = data.forename;
    currentProfessor.surname = data.surname;

    return this.professor.save(currentProfessor);
  }

  //Functions to add: add, editById
}
