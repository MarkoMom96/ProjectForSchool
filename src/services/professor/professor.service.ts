import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'entities/professor.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AddProfessorDto } from 'src/dtos/professor/add.professor.dto';
import { EditProfessorDto } from 'src/dtos/professor/edit.professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professor: Repository<Professor>,
  ) {}

  getAll(): Promise<Professor[]> {
    return this.professor.find();
  }

  getById(id: number): Promise<Professor> {
    return this.professor.findOne(id);
  }

  // DTO -> Model(Entity)
  add(data: AddProfessorDto): Promise<Professor> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    const newProfessor = new Professor();
    newProfessor.username = data.surname;
    newProfessor.passwordHash = passwordHashString;
    newProfessor.forename = data.forename;
    newProfessor.surname = data.surname;

    return this.professor.save(newProfessor);
  }
  async editByid(idNumber: number, data: EditProfessorDto): Promise<Professor> {
    const currentProfessor: Professor = await this.professor.findOne(idNumber);

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
