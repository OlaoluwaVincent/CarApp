import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { storage } from 'src/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v2 as cloudinary } from 'cloudinary';

@UseGuards(JwtAuthGuard)
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

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
  async findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }

  private async uploadImages(images: Array<Express.Multer.File>) {
    try {
      if (images) {
        const uploadedImages = await Promise.all(
          images.map((file) => cloudinary.uploader.upload(file.path)),
        );
        const secureUrls = uploadedImages.map((image) => image.secure_url);
        // Return the secure URLs in the response
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
