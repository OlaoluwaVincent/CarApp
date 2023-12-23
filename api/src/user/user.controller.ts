import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/multer.config';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.userService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.userService.findOne(res, id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('profileImage', { storage }))
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.updateProfile(res, id, updateUserDto, image);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    return this.userService.remove(req, res, id);
  }

  @Get('cars/:id')
  userHiredCars(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return this.userService.userHiredCars(req, res, id);
  }
}
