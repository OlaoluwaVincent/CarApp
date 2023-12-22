/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class BillingInfoDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  region: string;
}

export class RentalInfoDto {
  @IsString()
  location: string;

  @IsString()
  date: string;

  @IsString()
  time: string;
}

export class PaymentInfoDto {
  @IsString()
  cardHolder: string;
  @IsString()
  cardNumber: string;
  @IsString()
  expiryDate: string;
  @IsString()
  cvv: string;
}

export class HireDto {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  @IsObject()
  pickupInfo: RentalInfoDto;

  @IsObject()
  dropOffInfo: RentalInfoDto;

  @IsObject()
  billingAddress: BillingInfoDto;

  @IsObject()
  paymentInfo: PaymentInfoDto;
}
