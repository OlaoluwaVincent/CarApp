import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHireDto } from './dto/create-hire.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';

@Injectable()
export class HireService {
  constructor(private prismaDB: PrismaService) {}

  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  async hireCar(
    req: Request,
    res: Response,
    id: string,
    hireDto: CreateHireDto,
  ) {
    const isHired = await this.rentalDb.findUnique({
      where: { rentedCarId: id },
    });

    if (isHired) {
      throw new BadRequestException('Car has already been hired');
    }
    const car_to_hire = await this.carDb.findUnique({ where: { id: id } });
    const { userId } = req.user;

    if (!car_to_hire) {
      throw new NotFoundException('Car does not exist');
    }

    const rentedCar = await this.rentalDb.create({
      data: {
        paymentStatus: true,
        user: {
          connect: { id: userId },
        },
        RentedCar: {
          connect: { id: id },
        },
        rentDetail: {
          create: {
            billingAddress: { ...hireDto.billingAddress },
            dropOffInfo: { ...hireDto.dropOffInfo },
            pickupInfo: { ...hireDto.pickupInfo },
            paymentInfo: { ...hireDto.paymentInfo },
          },
        },
      },
      include: {
        rentDetail: true,
        user: true,
        RentedCar: true,
      },
    });

    if (!rentedCar) {
      throw new BadRequestException('Failed to create an hire');
    }

    await this.carDb.update({
      where: { id: rentedCar.rentedCarId },
      data: { rented: true },
    });

    res.status(HttpStatus.OK).json({ data: rentedCar });
  }

  async returnCar(
    req: Request,
    res: Response,
    carId: string,
    rentedId: string,
  ) {
    const { userId } = req.user;

    const hiredCar = await this.carDb.findUnique({
      where: { id: carId },
    });

    if (!hiredCar) {
      throw new BadRequestException('This car does not exist');
    }

    // get the car and check if it was this user that hiredIt
    const wasHired = await this.rentalDb.findUnique({
      where: { id: rentedId, userId: userId },
    });

    if (!wasHired) {
      throw new BadRequestException('This car was not hired');
    }

    const isReturned = await this.carDb.update({
      where: { id: carId },
      data: { rented: false },
    });
    await this.rentalDb.update({
      where: { id: rentedId },
      data: { isReturned: true },
    });

    if (!isReturned) {
      throw new BadRequestException('Please try again in a few minutes');
    }
    // Todo: Send mail to car owner to access car condition and accept return if Okay
    // todo: else charge for damages and file a complaint...

    res
      .status(HttpStatus.OK)
      .json({ message: "You've returned this car, please await acceptance." });
  }
}
