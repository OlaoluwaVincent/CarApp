/*
  Warnings:

  - Added the required column `pickupDate` to the `RentedCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDate` to the `RentedCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentedCar" ADD COLUMN     "pickupDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL;
