import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { cloud_name, api_key, api_secret } from 'src/constants';
import { v2 as cloudinary } from 'cloudinary';
import { Response } from 'express';

@Injectable()
export class CarService {
  async create(
    createCarDto: CreateCarDto,
    images: Express.Multer.File,
    res: Response,
  ): Promise<string> {
    let imageUrl = '';
    try {
      cloudinary.config({
        cloud_name: cloud_name,
        api_key: api_key,
        api_secret: api_secret,
      });
      imageUrl = await this.uploadImage(images);
      if (!imageUrl) {
        res.status(400).send('Please provide an image');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
    console.log('done', imageUrl);
    return `the image url is ${imageUrl}`;
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }

  private async uploadImage(image: Express.Multer.File) {
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
