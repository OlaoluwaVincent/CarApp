import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { HireService } from './hire.service';
import { CreateHireDto } from './dto/create-hire.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('hire')
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @Post(':id')
  async hire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() hireDto: CreateHireDto,
  ) {
    return this.hireService.hireCar(req, res, id, hireDto);
  }

  @Post(':carId/return/:rentedId')
  async returnCar(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.returnCar(req, res, carId, rentedId);
  }

  @Post(':carId/cancel/:rentedId')
  async cancelHire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.cancelHire(req, res, carId, rentedId);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.hireService.getAllHiredCars(req, res);
  }
}
