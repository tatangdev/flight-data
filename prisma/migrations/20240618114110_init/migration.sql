/*
  Warnings:

  - You are about to drop the column `airlineCode` on the `airplanes` table. All the data in the column will be lost.
  - You are about to drop the column `seatLayout` on the `airplanes` table. All the data in the column will be lost.
  - You are about to drop the column `seatPitch` on the `airplanes` table. All the data in the column will be lost.
  - You are about to drop the column `seatType` on the `airplanes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "airplanes" DROP COLUMN "airlineCode",
DROP COLUMN "seatLayout",
DROP COLUMN "seatPitch",
DROP COLUMN "seatType",
ADD COLUMN     "airline_code" TEXT,
ADD COLUMN     "seat_layout" TEXT,
ADD COLUMN     "seat_pitch" TEXT,
ADD COLUMN     "seat_type" TEXT;
