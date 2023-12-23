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

  async findAll(req: Request, res: Response) {
    const { role } = req.user;
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('You are not an Admin');
    }

    const allUsers = await this.userDB.findMany();

    const users = allUsers.map((users) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword, ...rest } = users;
      return rest;
    });

    res.status(HttpStatus.OK).json({ data: users });
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
    res: Response,
    id: string,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    const user = await this.userDB.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User not found');

    // Upload Image to Cloudinary
    const imageUrl = await updateImage(image, 'profile');

    if (updateUserDto.password) {
      //gen salt for hashing
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const profileToUpdate = await this.userDB.update({
      where: { id: id },
      data: {
        address: updateUserDto.address,
        email: updateUserDto.email,
        name: updateUserDto.name,
        region: updateUserDto.region,
        state: updateUserDto.state,
        hashedPassword: updateUserDto.password,
        profileImg: imageUrl,
      },
    });

    if (!profileToUpdate) {
      throw new BadRequestException('Failed to create profile');
    }

    res.status(HttpStatus.OK).json({ data: profileToUpdate });
  }

  async remove(req: Request, res: Response, id: string) {
    const userToDelete = await this.userDB.findUnique({ where: { id: id } });

    if (!userToDelete) {
      throw new NotFoundException("The user doesn't exist");
    }

    if (userToDelete.id !== id) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
    // if (role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     'Only admins and owners are authorized to access this resource.',
    //   );
    // }

    await this.userDB.delete({ where: { id: id } });

    res
      .status(HttpStatus.MOVED_PERMANENTLY)
      .json({ message: 'User deleted Successfully' });
  }

  // this gets all the cars hired by a particular user
  async userHiredCars(req: Request, res: Response, id: string) {
    const { userId, role } = req.user;

    const userHiredCars = await this.rentedCar.findMany({
      where: { userId: id },
      include: { RentedCar: true, rentDetail: true, user: true },
    });

    if (userId !== id) {
      throw new UnauthorizedException('This resource does not belong to you');
    }
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('You are not an admin');
    }

    const userWithoutPassword = userHiredCars.map((record) => {
      delete record.user.hashedPassword;
      return record;
    });

    res.status(HttpStatus.OK).json({ data: userWithoutPassword });
  }
}
