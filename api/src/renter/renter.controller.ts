import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RenterService } from './renter.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRenterDto } from './dto/create-renter.dto';
import { Request, Response } from 'express';
import { checkUserRole } from 'src/helperfunction';

@UseGuards(JwtAuthGuard)
@Controller('renter')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  // Request to rent a car
  @Post(':carId')
  async hire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') cardId: string,
    @Body() renterDto: CreateRenterDto,
  ) {
    checkUserRole(req);

    return this.renterService.createHireRequest(req, res, cardId, renterDto);
  }

  // Pay for the Requested Car
  @Post('car/:carId/accept/:rentedId')
  async acceptAndPay(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    checkUserRole(req);
    return this.renterService.makePayment(req, res, carId, rentedId);
  }

  // Cancel the request
  @Post('car/:carId/cancel/:rentedId')
  async cancelHire(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.renterService.cancelRequest(req, res, carId, rentedId);
  }

  // Return the car to the Rentor
  @Post('car/:carId/return/:rentedId')
  async returnCar(
    @Req() req: Request,
    @Res() res: Response,
    @Param('carId') carId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.renterService.returnCar(req, res, carId, rentedId);
  }
}
