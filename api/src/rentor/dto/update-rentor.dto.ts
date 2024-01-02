import { PartialType } from '@nestjs/swagger';
import { CreateRentorDto } from './create-rentor.dto';

export class UpdateRentorDto extends PartialType(CreateRentorDto) {}
