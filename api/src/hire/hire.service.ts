import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHireDto } from './dto/create-hire.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { sendGridMail } from 'src/helperfunction';

@Injectable()
export class HireService {
  constructor(private prismaDB: PrismaService) {}

  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  //todo: Create a service for car owners to accept the car upon users return
  //todo: Create a service to raise complaint.

  async createHireOrder(
    req: Request,
    res: Response,
    carId: string,
    hireDto: CreateHireDto,
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

  // Owner of the car Accept the hireOrder
  async acceptHire(res: Response, customerId: string, rentedId: string) {
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
  async deliverHire(res: Response, customerId: string, rentedId: string) {
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
  async rejectHire(res: Response, customerId: string, rentedId: string) {
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

  // User accepts Car and makes payment
  async acceptCar(
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
  async cancelHire(
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

  // admin gets all hired cars
  async getAllHiredCars(req: Request, res: Response) {
    // if (req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }
    const hired_cars = await this.rentalDb.findMany({
      where: { isReturned: false },
      include: { rentDetail: true, RentedCar: true, Renter: true },
    });

    res.status(HttpStatus.OK).json({ data: hired_cars });
  }

  async findOneRentedCar(req: Request, res: Response, rentedId: string) {
    // if (req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }
    const hired_cars = await this.rentalDb.findUnique({
      where: { id: rentedId },
      include: { rentDetail: true, RentedCar: true, Renter: true },
    });

    res.status(HttpStatus.OK).json({ data: hired_cars });
  }
}
