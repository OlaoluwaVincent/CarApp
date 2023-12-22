/*
  Warnings:

  - Made the column `rentedCarId` on table `RentedCar` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RentedCar" DROP CONSTRAINT "RentedCar_rentedCarId_fkey";

-- AlterTable
ALTER TABLE "RentedCar" ALTER COLUMN "rentedCarId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_rentedCarId_fkey" FOREIGN KEY ("rentedCarId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
