import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // @Post('login')
  // async login(@Body() dto: LoginDto, @Res() res: Response) {
  //   return this.authService.login(dto, res);
  // }

  // @Get('sign-out')
  // signOut(@Res() res: Response) {
  //   return this.authService.logout(res);
  // }
}
