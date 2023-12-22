import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './multer.config';
import { HireModule } from './hire/hire.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CarModule,
    MulterModule.register({
      storage,
    }),
    HireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
