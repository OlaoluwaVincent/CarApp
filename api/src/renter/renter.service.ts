import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRenterDto } from './dto/create-renter.dto';
import { PrismaService } from 'prisma/prisma.service';
import { sendGridMail } from 'src/helperfunction';
import { Request, Response } from 'express';

@Injectable()
export class RenterService {
  constructor(private prismaDB: PrismaService) {}

  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  // Make a rent request
  async createHireRequest(
    req: Request,
    res: Response,
    carId: string,
    hireDto: CreateRenterDto,
  ) {
    const isHired = await this.carDb.findUnique({
      where: { id: carId },
    });

    if (!isHired) {
      throw new NotFoundException('Car does not exist');
    }

    if (isHired.rented) {
      throw new BadRequestException('Car has already been hired');
    }

    const { userId } = req.user;

    const rentedCar = await this.rentalDb.create({
      data: {
        Renter: {
          connect: { id: userId },
        },
        RentedCar: {
          connect: { id: carId },
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
        Renter: true,
        RentedCar: true,
      },
    });

    if (!rentedCar) {
      throw new BadRequestException('Failed to create an hire');
    }

    res.status(HttpStatus.OK).json({ data: rentedCar });
  }

  // User accepts Car and makes payment
  async makePayment(
    req: Request,
    res: Response,
    carId: string,
    rentalId: string,
  ) {
    const { userId } = req.user;

    // check if the car was hired by this customer
    const isHired = await this.rentalDb.findUnique({
      where: { id: rentalId, rentedCarId: carId },
    });

    if (!isHired) {
      throw new BadRequestException('Car was not hired');
    }

    if (isHired.renterId !== userId) {
      throw new BadRequestException('You did not hire this car!');
    }

    // Check if the carOwner has accepted the Hire Order.
    if (isHired.status !== 'ACCEPTED') {
      throw new BadRequestException('Your Hire is not yet been accepted');
    }

    // Make Payment
    //todo: Integrate payment api
    const accepted_car = await this.rentalDb.update({
      where: { id: rentalId },
      data: {
        paymentStatus: true,
      },
    });

    if (!accepted_car) {
      throw new BadRequestException('Please try again later');
    }

    const updated_car = await this.carDb.update({
      where: { id: carId },
      data: { rented: true },
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
    });
    const dynamicData = {
      subject: 'Payment Successful',
      pre_header: `The Hire order for ${updated_car.name} has been settled`,
      caption: `The Hire order for ${updated_car.name} has been settled. Please kindly deliver this car in time`,
      payment_link: '',
      car_name: updated_car.name,
      subtotal: updated_car.amount,
      total: updated_car.amount,
      delivery_charges: '20,000',
    };

    await sendGridMail(updated_car.User.email, dynamicData);

    res
      .status(HttpStatus.OK)
      .json({ message: 'Payment has been made, please await deliver' });
  }

  // User cancels the hire before purchase
  async cancelRequest(
    req: Request,
    res: Response,
    carId: string,
    rentedId: string,
  ) {
    const { userId } = req.user;
    const rentedCar = await this.rentalDb.findUnique({
      where: { id: rentedId },
    });

    if (!rentedCar) {
      throw new NotFoundException('This car was not hired');
    }

    if (rentedCar.renterId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to do this action",
      );
    }
    await this.carDb.update({ where: { id: carId }, data: { rented: false } });

    res.status(HttpStatus.OK).json({ message: 'You have cancelled your hire' });
  }

  // Accept Request after Deliver
  async AcceptCarOnDelivery(
    req: Request,
    res: Response,
    carId: string,
    rentedId: string,
  ) {
    const { userId } = req.user;

    const rentedCar = await this.rentalDb.findUnique({
      where: { id: rentedId },
    });

    if (!rentedCar) {
      throw new NotFoundException('This car was not hired');
    }

    if (rentedCar.renterId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to do this action",
      );
    }
    await this.carDb.update({ where: { id: carId }, data: { rented: false } });

    res.status(HttpStatus.OK).json({ message: 'You have cancelled your hire' });
  }

  // User returns the car after Use
  async returnCar(
    req: Request,
    res: Response,
    carId: string,
    rentedId: string,
  ) {
    const { userId } = req.user;

    const hiredCar = await this.carDb.findUnique({
      where: { id: carId, rented: true },
    });

    if (!hiredCar) {
      throw new BadRequestException('This car does not exist or was not hired');
    }

    // get the car and check if it was this user that hiredIt
    const wasHired = await this.rentalDb.findUnique({
      where: { id: rentedId, renterId: userId },
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
