import { Controller, Get } from '@nestjs/common';
import { ProfessorService } from './services/professor/professor.service';
import { Professor } from 'entities/professor.entity';

@Controller()
export class AppController {
  constructor(private professorService: ProfessorService) {}

  @Get() // GET http://localhost:3000/
  getHomePage(): string {
    return 'Hello World!';
  }

  @Get('api/professor') // GET http://localhost:3000/api/professor/
  getAllProfessors(): Promise<Professor[]> {
    return this.professorService.getAll();
  }
}
