/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

type User = {
  userId: string;
  email: string;
  role: string;
};
