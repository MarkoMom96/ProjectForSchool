import { Controller, Get } from '@nestjs/common';
import { ProfessorService } from '../services/professor/professor.service';

@Controller()
export class AppController {
  constructor(private professorService: ProfessorService) {}

  @Get() // GET http://localhost:3000/
  getHomePage(): string {
    return 'Home Page';
  }
}
