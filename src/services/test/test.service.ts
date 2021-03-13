import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from 'src/entities/test.entity';

@Injectable()
export class TestService extends TypeOrmCrudService<Test> {
  constructor(
    @InjectRepository(Test)
    private readonly test: Repository<Test>,
  ) {
    super(test);
  }
}
