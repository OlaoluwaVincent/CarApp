import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { uploadMultipleImages } from 'src/helperfunction';

@Injectable()
export class CarService {
  constructor(private prismaDB: PrismaService) {}
  public carDb = this.prismaDB.car;
  public rentalDb = this.prismaDB.rentedCar;

  async create(
    createCarDto: CreateCarDto,
    images: Express.Multer.File[],
    req: Request,
    res: Response,
  ) {
    try {
      const { userId } = req.user;
      const imageUrl = await uploadMultipleImages(images);

      if (!imageUrl) {
        throw new BadRequestException('Please provide an image');
      }

      // Create Car and fetch the associated CarImage in a single query
      const carWithImage = await this.carDb.create({
        data: {
          ...createCarDto,
          User: { connect: { id: userId } },
          carImage: {
            create: {
              images: imageUrl,
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
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll(
    res: Response,
    sort: 'asc' | 'desc',
    page?: number,
    search?: string,
    type?: string,
    steering?: string,
  ) {
    try {
      const perPage = 2;
      const pageNumber = !page ? 1 : page;
      const skip = (pageNumber - 1) * perPage;

      const [allCars, totalCount] = await Promise.all([
        this.carDb.findMany({
          where: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
            carType: {
              contains: type,
              mode: 'insensitive',
            },
            steering: {
              contains: steering,
              mode: 'insensitive',
            },
          },
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
        this.carDb.count({
          where: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
            carType: {
              contains: type,
              mode: 'insensitive',
            },
            steering: {
              contains: steering,
              mode: 'insensitive',
            },
          },
        }), // Get the total count of cars (for pagination)
      ]);

      // this returns the total number of pages that the data could be split into.
      const totalPages = Math.ceil(totalCount / perPage);

      return res.status(HttpStatus.OK).json({
        data: allCars,
        length: allCars.length,
        totalCount,
        totalPages,
        page
      });
    } catch (error) {
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
        User: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    return res.status(HttpStatus.OK).json({ data: car });
  }
}
