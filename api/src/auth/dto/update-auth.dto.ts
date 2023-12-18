import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password?: string;

  @IsString()
  name?: string;
}
