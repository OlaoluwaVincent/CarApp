import { IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  carType: string;

  @IsString()
  steering: string;

  @IsString()
  capacity: string;

  @IsString()
  gasoline: string;

  @IsString()
  amount: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  tag: string;

  @IsString()
  @IsOptional()
  tagDescription: string;

  @IsString()
  state: string;

  @IsString()
  region: string;
}
