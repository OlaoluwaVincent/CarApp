import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  profileImg: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  region: string;
}
