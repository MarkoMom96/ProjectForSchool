import * as Validator from 'class-validator';

export class EditStudentDto {
  @Validator.IsNotEmpty()
  @Validator.Length(8, 128)
  password: string;
}
