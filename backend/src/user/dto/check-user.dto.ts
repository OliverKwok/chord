import { IsNotEmpty, IsString } from 'class-validator';

export class CheckUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
