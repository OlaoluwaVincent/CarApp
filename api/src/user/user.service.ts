import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { updateImage } from 'src/helperfunction';

@Injectable()
export class UserService {
  constructor(private prismaDB: PrismaService) {}
  public userDB = this.prismaDB.user;
  public rentedCar = this.prismaDB.rentedCar;

  async getUserDetails(req: Request, res: Response) {
    const { userId } = req.user;
    const user = await this.userDB.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    delete user.hashedPassword;

    res.status(HttpStatus.OK).json({ data: user });
  }

  async findOne(res: Response, id: string) {
    const foundUser = await this.userDB.findUnique({ where: { id: id } });

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    delete foundUser.hashedPassword;

    res.status(HttpStatus.OK).json({ data: foundUser });
    return `This action returns a #${id} user`;
  }

  async updateProfile(
    req: Request,
    res: Response,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    const { userId } = req.user;
    const user = await this.userDB.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    // Upload Image to Cloudinary
    const imageUrl = await updateImage(image, 'profile');

    if (updateUserDto.password) {
      //gen salt for hashing
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedProfile = await this.userDB.update({
      where: { id: userId },
      data: {
        address: updateUserDto.address,
        email: updateUserDto.email ?? user.email,
        name: updateUserDto.name ?? user.name,
        region: updateUserDto.region ?? user.region,
        state: updateUserDto.state ?? user.state,
        hashedPassword: updateUserDto.password ?? user.hashedPassword,
        profileImg: imageUrl ?? user.profileImg,
      },
    });

    if (!updatedProfile) {
      throw new BadRequestException('Failed to create profile');
    }

    delete updatedProfile.hashedPassword;
    res.status(HttpStatus.OK).json({ data: updatedProfile });
  }

  async remove(req: Request, res: Response) {
    const { userId } = req.user;
    const userToDelete = await this.userDB.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new NotFoundException("The user doesn't exist");
    }

    if (userToDelete.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }

    await this.userDB.delete({ where: { id: userId } });

    res.status(HttpStatus.OK).json({ message: 'User deleted Successfully' });
  }

  // this gets all the cars hired by a particular user
  async userHiredCars(res: Response, userId: string) {
    const userHiredCars = await this.rentedCar.findMany({
      where: { renterId: userId },
      include: { RentedCar: true },
    });

    res.status(HttpStatus.OK).json({ data: userHiredCars });
  }
}
