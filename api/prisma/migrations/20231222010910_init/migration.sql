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
    "region" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "carImageId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedCar" (
    "id" TEXT NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "rentedCarId" TEXT NOT NULL,
    "rentalDetailId" TEXT NOT NULL,

    CONSTRAINT "RentedCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedCarDetails" (
    "id" TEXT NOT NULL,
    "pickupInfo" JSONB NOT NULL,
    "dropOffInfo" JSONB NOT NULL,
    "billingAddress" JSONB NOT NULL,
    "paymentInfo" JSONB NOT NULL,

    CONSTRAINT "RentedCarDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "expirationMonth" INTEGER NOT NULL,
    "expirationYear" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carImageId_key" ON "Car"("carImageId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedCar_userId_key" ON "RentedCar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedCar_rentedCarId_key" ON "RentedCar"("rentedCarId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedCar_rentalDetailId_key" ON "RentedCar"("rentalDetailId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carImageId_fkey" FOREIGN KEY ("carImageId") REFERENCES "CarImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_rentedCarId_fkey" FOREIGN KEY ("rentedCarId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedCar" ADD CONSTRAINT "RentedCar_rentalDetailId_fkey" FOREIGN KEY ("rentalDetailId") REFERENCES "RentedCarDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
