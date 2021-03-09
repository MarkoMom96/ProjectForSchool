import * as Validator from 'class-validator';

export class AddProfessorDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[a-z]{3,32}\.[a-z]{3}[0-9]{2}$/)
  username: string;

  @Validator.IsNotEmpty()
  @Validator.Length(8, 128) 
  password: string;

  @Validator.IsNotEmpty()
  @Validator.Length(3,32)
  forename: string;

  @Validator.IsNotEmpty()
  @Validator.Length(3,32)
  surname: string;
}
