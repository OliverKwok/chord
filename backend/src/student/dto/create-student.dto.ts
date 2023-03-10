import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;
}
