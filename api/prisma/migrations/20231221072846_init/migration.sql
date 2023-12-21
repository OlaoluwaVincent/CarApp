-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "steering" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "gasoline" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT,
    "tagDescription" TEXT,
    "carImageId" TEXT NOT NULL,
    "rentedCarId" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedCar" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RentedCar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carImageId_key" ON "Car"("carImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_rentedCarId_key" ON "Car"("rentedCarId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedCar_userId_key" ON "RentedCar"("userId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carImageId_fkey" FOREIGN KEY ("carImageId") REFERENCES "CarImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_rentedCarId_fkey" FOREIGN KEY ("rentedCarId") REFERENCES "RentedCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
