/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class BillingInfoDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the person',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Street address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'City',
    description: 'Region or city',
  })
  @IsString()
  region: string;
}

export class RentalInfoDto {
  @ApiProperty({
    example: 'Location Name',
    description: 'Location for rental',
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: '2023-12-22',
    description: 'Rental date',
  })
  @IsString()
  date: string;

  @ApiProperty({
    example: '14:30',
    description: 'Rental time',
  })
  @IsString()
  time: string;
}

export class PaymentInfoDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name on the card',
  })
  @IsString()
  cardHolder: string;

  @ApiProperty({
    example: '1234567890123456',
    description: 'Card number',
  })
  @IsString()
  cardNumber: string;

  @ApiProperty({
    example: '12/25',
    description: 'Expiry date of the card',
  })
  @IsString()
  expiryDate: string;

  @ApiProperty({
    example: '123',
    description: 'CVV of the card',
  })
  @IsString()
  cvv: string;
}

export class CreateRenterDto {
  @ApiProperty({
    type: RentalInfoDto,
    description: 'Pickup information',
  })
  @IsObject()
  pickupInfo: RentalInfoDto;

  @ApiProperty({
    type: RentalInfoDto,
    description: 'Drop-off information',
  })
  @IsObject()
  dropOffInfo: RentalInfoDto;

  @ApiProperty({
    type: BillingInfoDto,
    description: 'Billing address information',
  })
  @IsObject()
  billingAddress: BillingInfoDto;

  @ApiProperty({
    type: PaymentInfoDto,
    description: 'Payment information',
  })
  @IsObject()
  paymentInfo: PaymentInfoDto;
}
