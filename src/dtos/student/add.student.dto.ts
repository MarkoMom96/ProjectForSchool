import * as Validator from 'class-validator';

export class AddStudentDto {
    
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[0-9]{10}$/)
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
  