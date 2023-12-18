import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { jwtSecret } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { LoginType } from './dto/authType';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaDb: PrismaService,
    private jwt: JwtService,
  ) {}

  public userDB = this.prismaDb.user;

  async create(createAuthDto: CreateAuthDto) {
    const data = await this.userDB.create({
      data: { ...createAuthDto, hashedPassword: '12345dfd' },
    });

    const token = await this.signToken({
      id: data.id,
      email: data.email,
    });

    return { data, token };
  }

  async login(data: LoginType) {
    const user = await this.userDB.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    // const isValid = await user.hashedPassword.compare(data.password);
  }

  // Helper Func
  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '24h',
    });
  }
}
