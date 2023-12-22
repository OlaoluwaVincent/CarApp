/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profileImg" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "region" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Profile";
