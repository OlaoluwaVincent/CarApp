import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { storage } from 'src/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { v2 as cloudinary } from 'cloudinary';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('images', { storage }))
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response,
  ) {
    return this.carService.create(createCarDto, image, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('page') page?: number,
  ) {
    try {
      return this.carService.findAll(res, sort, page);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  // private async uploadImages(images: Array<Express.Multer.File>) {
  //   try {
  //     if (images) {
  //       const uploadedImages = await Promise.all(
  //         images.map((file) => cloudinary.uploader.upload(file.path)),
  //       );
  //       const secureUrls = uploadedImages.map((image) => image.secure_url);
  //       // Return the secure URLs in the response
  //       return secureUrls;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image to Cloudinary:', error);
  //     throw new Error('Failed to upload image');
  //   }
  // }
}
