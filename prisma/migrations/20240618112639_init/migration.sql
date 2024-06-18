/*
  Warnings:

  - You are about to drop the column `airlineId` on the `airplanes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "airplanes" DROP COLUMN "airlineId",
ADD COLUMN     "airlineCode" TEXT;
