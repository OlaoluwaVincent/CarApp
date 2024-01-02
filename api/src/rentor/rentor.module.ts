import { Module } from '@nestjs/common';
import { RentorService } from './rentor.service';
import { RentorController } from './rentor.controller';

@Module({
  controllers: [RentorController],
  providers: [RentorService],
})
export class RentorModule {}
