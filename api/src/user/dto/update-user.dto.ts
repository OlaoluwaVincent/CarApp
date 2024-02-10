import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'New password for the user',
  })
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Address of the user',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    example: 'file in jpg|jpeg|png|img',
    description: 'Profile picture to upload',
  })
  @IsString()
  @IsOptional()
  profileImg: string;

  @ApiProperty({
    example: 'State of residence',
    description: 'The state the user resides in',
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    example: 'City or local government or region user resides in',
    description: 'Region where the user is located',
  })
  @IsString()
  @IsOptional()
  region: string;
}
