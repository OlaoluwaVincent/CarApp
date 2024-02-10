import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { jwtSecret } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { LoginType } from './dto/authType';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaDb: PrismaService,
    private jwt: JwtService,
  ) {}

  public userDB = this.prismaDb.user;

  async create(createAuthDto: CreateAuthDto, role: string) {
    console.log(role);
    const userRole = role === 'renter' ? 'CUSTOMER' : 'SELLER';
    const isExisting = await this.userDB.findUnique({
      where: { email: createAuthDto.email },
    });

    if (isExisting) {
      throw new ConflictException('User with this email already exists.');
    }
    //gen salt for hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);

    // upload the hashedPassword
    const data = await this.userDB.create({
      data: {
        email: createAuthDto.email,
        name: createAuthDto.name,
        hashedPassword,
        role: userRole,
      },
    });

    if (!data) {
      throw new BadRequestException(
        'Invalid data provided for account creation.',
      );
    }

    //Sign token for the new user
    const token = await this.signToken({
      userId: data.id,
      email: data.email,
      role: data.role,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: password, ...userData } = data;

    return { data: userData, token };
  }

  async login(data: LoginType) {
    const user = await this.userDB.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(data.password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = await this.signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...userDetails } = user;
    return { data: { ...userDetails }, token };
  }

  // Helper Func
  async signToken(args: { userId: string; email: string; role: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '24h',
    });
  }
}
