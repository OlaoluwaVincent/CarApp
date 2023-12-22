/* eslint-disable prettier/prettier */
import { IsObject, IsString } from 'class-validator';

export class HireDto {
  @IsObject()
  pickupInfo: RentalInfoDto;

  @IsObject()
  dropOffInfo: RentalInfoDto;

  @IsObject()
  billingAddress: BillingInfoDto;

  @IsObject()
  paymentInfo: PaymentInfoDto;
}

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
