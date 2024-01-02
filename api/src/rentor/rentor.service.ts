import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { sendGridMail } from 'src/helperfunction';

@Injectable()
export class RentorService {
  constructor(private prismaDB: PrismaService) {}

  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  //todo: Create a service for car owners to accept the car upon users return
  //todo: Create a service to raise complaint.

  // Owner of the car Accept the rent request
  async acceptRequest(res: Response, customerId: string, rentedId: string) {
    //todo: Check if the car belongs to the owner before proceeding with the update

    // check if the car was hired by the right customer
    const isRented = await this.rentalDb.findUnique({
      where: { id: rentedId },
      include: { Renter: true },
    });

    if (!isRented) {
      throw new BadRequestException('This car was not hired');
    }

    if (isRented.renterId !== customerId) {
      throw new ForbiddenException('This car was not hired by you');
    }

    const isUpdated = await this.rentalDb.update({
      where: { id: rentedId },
      data: { status: 'ACCEPTED' },
    });

    if (!isUpdated) {
      throw new BadRequestException('Please try again');
    }

    const dynamicData = {
      subject: 'This is the subject for the stuff',
      pre_header: 'This is a simple description of the email',
      caption: 'This is a caption',
      payment_link: 'https://google.com',
      car_name: 'ferrari',
      subtotal: '200,000',
      total: '200,000',
      delivery_charges: '20,000',
    };

    await sendGridMail(isRented.Renter.email, dynamicData);

    res
      .status(HttpStatus.OK)
      .json({ message: 'Please deliver this car as requested' });
  }

  // Owner of the car delivers the car
  async deliverCar(res: Response, customerId: string, rentedId: string) {
    const isRented = await this.rentalDb.findUnique({
      where: { id: rentedId },
    });

    if (!isRented) {
      throw new ForbiddenException('This car was not hired');
    }

    // Check if this car was hired in the first place
    if (isRented.renterId !== customerId) {
      console.log(isRented);

      throw new ForbiddenException('You did not hire this car.');
    }

    // Check if the renter has paid for this hire.
    if (isRented.paymentStatus === false) {
      throw new ForbiddenException('Kindly wait for payment to be completed');
    }

    // update the status of the car to Delivered
    const isUpdated = await this.rentalDb.update({
      where: { id: rentedId },
      data: { isDelivered: true },
    });

    if (!isUpdated) {
      throw new BadRequestException('Please try again');
    }

    await this.carDb.update({
      where: { id: isRented.rentedCarId },
      data: { rented: true },
    });

    res.status(HttpStatus.OK).json({ message: 'Enjoy your ride' });
  }

  // Owner of the car rejects the HireOrder
  async rejectCarRequest(res: Response, customerId: string, rentedId: string) {
    //todo: accept a bodyDto with the reason for rejecting the car
    //todo: send the reason to the customer via mail.

    // check if the car was hired by the right customer
    const isRented = await this.rentalDb.findUnique({
      where: { id: rentedId },
    });

    if (!isRented) {
      throw new ForbiddenException('You did not hire this car.');
    }

    if (isRented.renterId !== customerId) {
      throw new UnauthorizedException('You did not hire this ride');
    }

    if (isRented.isDelivered) {
      throw new BadRequestException(
        'You cannot reject this ride, it has been delivered',
      );
    }

    const isUpdated = await this.rentalDb.update({
      where: { id: rentedId },
      data: { status: 'REJECTED' },
    });

    await this.carDb.update({
      where: { id: isRented.rentedCarId },
      data: { rented: false },
    });

    if (!isUpdated) {
      throw new BadRequestException('Please try again');
    }

    res
      .status(HttpStatus.OK)
      .json({ message: 'You have rejected this hired purchase' });
  }

  // Get cars hired from me
  async getCarsHiredFromMe(req: Request, res: Response) {
    const { userId } = req.user;

    const hired_cars = await this.carDb.findMany({
      where: {
        ownerId: userId,
        OR: [{ rented: true }, { car: { isReturned: true } }],
      },
      include: { carImage: { select: { images: true } } },
    });

    res.status(HttpStatus.OK).json({ data: hired_cars });
  }

  async findOneRentedCar(res: Response, rentedId: string) {
    const hired_cars = await this.rentalDb.findUnique({
      where: { id: rentedId },
      include: { rentDetail: true, RentedCar: true, Renter: true },
    });

    res.status(HttpStatus.OK).json({ data: hired_cars });
  }
}
