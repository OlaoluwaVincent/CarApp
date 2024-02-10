import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;
}
