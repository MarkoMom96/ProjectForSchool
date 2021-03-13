import * as Validator from 'class-validator';

export class EditProfessorDto {
  @Validator.IsNotEmpty()
  @Validator.Length(8, 128)
  password: string;
}
