import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Res,
  UseGuards,
  Query,
  HttpStatus,
  Param,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { storage } from 'src/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 4, { storage }))
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() image: Express.Multer.File[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.carService.create(createCarDto, image, req, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('steering') steering?: string,
  ) {
    try {
      return this.carService.findAll(res, sort, page, search, type, steering);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    return this.carService.findOne(res, id);
  }
}
