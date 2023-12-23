-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_carImageId_fkey";

-- DropForeignKey
ALTER TABLE "RentedCar" DROP CONSTRAINT "RentedCar_rentalDetailId_fkey";

-- DropForeignKey
ALTER TABLE "RentedCar" DROP CONSTRAINT "RentedCar_rentedCarId_fkey";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carImageId_fkey" FOREIGN KEY ("carImageId") REFERENCES "CarImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_rentedCarId_fkey" FOREIGN KEY ("rentedCarId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_rentalDetailId_fkey" FOREIGN KEY ("rentalDetailId") REFERENCES "RentedCarDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
