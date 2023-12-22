import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { cloud_name, api_key, api_secret } from 'src/constants';
import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HireDto } from './dto/car-hire-dto';

@Injectable()
export class CarService {
  constructor(private prismaDB: PrismaService) {}
  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  async create(
    createCarDto: CreateCarDto,
    images: Express.Multer.File,
    res: Response,
  ) {
    try {
      const imageUrl = await this.uploadImage(images);

      if (!imageUrl) {
        throw new BadRequestException('Please provide an image');
      }

      // Create Car and fetch the associated CarImage in a single query
      const carWithImage = await this.carDb.create({
        data: {
          ...createCarDto,
          carImage: {
            create: {
              images: [imageUrl],
            },
          },
        },
        include: {
          carImage: {
            select: {
              images: true,
            },
          },
        },
      });

      if (!carWithImage) {
        throw new BadRequestException('Something went wrong');
      }

      return res.status(HttpStatus.CREATED).json({ data: carWithImage });
    } catch (error) {
      // Handle the error appropriately, e.g., log it or send an error response
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll(res: Response, sort: 'asc' | 'desc', page?: number) {
    try {
      const perPage = 10;
      const pageNumber = !page ? 1 : page;
      const skip = (pageNumber - 1) * perPage;

      const [allCars, totalCount] = await Promise.all([
        this.carDb.findMany({
          include: {
            carImage: {
              select: {
                images: true,
              },
            },
          },
          orderBy: {
            amount: sort.toLowerCase() as Prisma.SortOrder,
          },
          take: perPage,
          skip,
        }),
        this.carDb.count(), // Get the total count of cars (for pagination)
      ]);

      // this returns the total number of pages that the data could be splitted into.
      const totalPages = Math.ceil(totalCount / perPage);

      return res.status(HttpStatus.OK).json({
        data: allCars,
        length: allCars.length,
        totalCount,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findOne(res: Response, id: string) {
    const car = await this.carDb.findUnique({
      where: { id: id },
      include: {
        carImage: {
          select: {
            images: true,
          },
        },
      },
    });

    return res.status(HttpStatus.OK).json({ data: car });
  }

  async hireCar(req: Request, res: Response, id: string, hireDto: HireDto) {
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

    res.status(HttpStatus.OK).json({ data: rentedCar });
  }
  private async uploadImage(image: Express.Multer.File) {
    cloudinary.config({
      cloud_name: cloud_name,
      api_key: api_key,
      api_secret: api_secret,
    });
    try {
      if (image) {
        const uploadedImages = await cloudinary.uploader.upload(image.path);
        const secureUrls = uploadedImages.secure_url;
        return secureUrls;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  }
}
