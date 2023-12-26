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

  @Post(':carId')
  async hire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') cardId: string,
    @Body() hireDto: CreateHireDto,
  ) {
    return this.hireService.createHireOrder(req, res, cardId, hireDto);
  }

  @Post(':customerId/accept/:rentedId')
  async acceptUserHire(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.acceptHire(res, customerId, rentedId);
  }

  @Post(':customerId/deliver/:rentedId')
  async deliverCarToUser(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.deliverHire(res, customerId, rentedId);
  }

  @Post(':customerId/reject/:rentedId')
  async rejectUserOrder(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.rejectHire(res, customerId, rentedId);
  }

  @Post('car/:carId/accept/:rentedId')
  async acceptAndPay(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.acceptCar(req, res, carId, rentedId);
  }

  @Post('car/:carId/cancel/:rentedId')
  async cancelHire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.cancelHire(req, res, carId, rentedId);
  }

  @Post('car/:carId/return/:rentedId')
  async returnCar(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.hireService.returnCar(req, res, carId, rentedId);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.hireService.getAllHiredCars(req, res);
  }

  @Get(':rentedId')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('rentedId') rentedId: string,
  ) {
    return await this.hireService.findOneRentedCar(req, res, rentedId);
  }
}
