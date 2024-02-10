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
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('User Routes')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserDetails(@Req() req: Request, @Res() res: Response) {
    return this.userService.getUserDetails(req, res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.userService.findOne(res, id);
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor('profileImage', { storage }))
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.updateProfile(req, res, updateUserDto, image);
  }

  @Delete()
  remove(@Req() req: Request, @Res() res: Response) {
    return this.userService.remove(req, res);
  }

  @Get('cars/:userId')
  userHiredCars(@Res() res: Response, @Param('userId') userId: string) {
    return this.userService.userHiredCars(res, userId);
  }
}
