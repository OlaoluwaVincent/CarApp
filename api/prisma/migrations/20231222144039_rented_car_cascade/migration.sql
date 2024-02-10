-- DropForeignKey
ALTER TABLE "RentedCar" DROP CONSTRAINT "RentedCar_userId_fkey";

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
