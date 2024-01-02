import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginType } from './dto/authType';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto, @Query('role') role: string) {
    return this.authService.create(createAuthDto, role);
  }

  @Post('login')
  async login(@Body() dto: LoginType) {
    return this.authService.login(dto);
  }

  // @Get('sign-out')
  // signOut(@Res() res: Response) {
  //   return this.authService.logout(res);
  // }
}
