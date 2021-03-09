import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/entities/professor.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AddProfessorDto } from 'src/dtos/professor/add.professor.dto';
import { EditProfessorDto } from 'src/dtos/professor/edit.professor.dto';
import { ApiResponse } from 'src/controllers/misc/api.response.class';
import { async } from 'rxjs/internal/scheduler/async';
import { ProfessorToken } from 'src/entities/professor.token.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor) private readonly professor: Repository<Professor>,
    @InjectRepository(ProfessorToken) private readonly professorToken: Repository<ProfessorToken>
  ) {}

  getAll(): Promise<Professor[]> {
    return this.professor.find({
      select:[
              'professorId',
              'username',
              'forename',
              'surname',       
      ]
    });
  }

  getById(id: number): Promise<Professor | ApiResponse> {
    
    return new Promise(async resolve => {
        const professor = await this.professor.findOne(id,{
          select:[
                  'professorId',
                  'username',
                  'forename',
                  'surname',
                ]
        });

        if (professor === undefined) {
          resolve(new ApiResponse('error', -1002, "Professor with that id doesn't exist."));
        }
        resolve(professor);
    });
  }

  async getByUsername(givenUsername: string): Promise<Professor | null>{
    const professor = await this.professor.findOne({
      username: givenUsername
    });
      if (professor){
        return professor;
      }
      return null;
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
          resolve(new ApiResponse('error', -1001, "Username already exists."))
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

    currentProfessor.username = data.username;
    currentProfessor.passwordHash = passwordHashString;
    currentProfessor.forename = data.forename;
    currentProfessor.surname = data.surname;

    return this.professor.save(currentProfessor);
  }

  async addToken(professorId: number, token: string, expiresAt: string) {
    const userToken = new ProfessorToken();
      userToken.professorId = professorId
      userToken.token = token
      userToken.expiresAt = expiresAt

      return await this.professorToken.save(userToken);
    }

  async getProfessorToken(token: string): Promise<ProfessorToken> {
    return await this.professorToken.findOne({
      token: token,
    });
  }
  async invalidateToken(token: string) : Promise<ProfessorToken | ApiResponse>{
    const professorToken = await this.professorToken.findOne({
      token: token
    });
    if(!professorToken) return new ApiResponse("error", -10001, "Token nije pronadjen");

    professorToken.isValid = 0;
    await this.professorToken.save(professorToken);

    return await this.getProfessorToken(token);

  } 
  async invalidateProfessorTokens(professorId: number): Promise<(ProfessorToken | ApiResponse)[]> {
    const professorTokens = await this.professorToken.find({
      professorId : professorId
      
    });
      const results = []
      for (const professorToken of professorTokens) {
          results.push(this.invalidateToken(professorToken.token));

      }
        return results;
    

  }
}
