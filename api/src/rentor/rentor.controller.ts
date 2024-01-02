import { Controller, Get, Post, Param, Req, Res } from '@nestjs/common';
import { RentorService } from './rentor.service';
import { Request, Response } from 'express';

@Controller('rentor')
export class RentorController {
  constructor(private readonly rentorService: RentorService) {}

  @Post(':customerId/accept/:rentedId')
  async acceptUserHire(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.rentorService.acceptRequest(res, customerId, rentedId);
  }

  @Post(':customerId/deliver/:rentedId')
  async deliverCarToUser(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.rentorService.deliverCar(res, customerId, rentedId);
  }

  @Post(':customerId/reject/:rentedId')
  async rejectUserOrder(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('rentedId') rentedId: string,
  ) {
    return this.rentorService.rejectCarRequest(res, customerId, rentedId);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.rentorService.getCarsHiredFromMe(req, res);
  }

  @Get(':rentedId')
  async findOne(@Res() res: Response, @Param('rentedId') rentedId: string) {
    return await this.rentorService.findOneRentedCar(res, rentedId);
  }
}
