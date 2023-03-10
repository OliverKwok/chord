import { IsNotEmpty } from 'class-validator';

export class CreatePrintRecordDto {
  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  print_file_name: string;
}
