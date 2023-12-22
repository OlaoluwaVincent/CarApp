/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //? this is for cookies validation
      // jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  // this if for the cookies
  //   private static extractJWT(req: Request): string | null {
  //     if (req.cookies && 'token' in req.cookies) {
  //       return req.cookies.token;
  //     }
  //     return null;
  //   }
  async validate({ user }: Request) {
    return { userId: user.userId, email: user.email, role: user.role };
  }
}
