/*
  Warnings:

  - You are about to drop the column `arrival_base_timestamp` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departure_base_timestamp` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_friday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_monday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_saturday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_sunday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_thursday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_tuesday` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `is_wednesday` on the `flights` table. All the data in the column will be lost.
  - Made the column `airline_code` on table `airplanes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seat_layout` on table `airplanes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seat_pitch` on table `airplanes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seat_type` on table `airplanes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `airplanes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `arrival_date` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_timestamp` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_date` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_timestamp` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Made the column `departure_airport` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arrival_airport` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departure_terminal_name` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arrival_terminal_name` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `flight_number` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `airline_code` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `airplane_code` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `free_baggage` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cabin_baggage` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departure_time` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arrival_time` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration_minute` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class` on table `flights` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `flights` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "airplanes" ALTER COLUMN "airline_code" SET NOT NULL,
ALTER COLUMN "seat_layout" SET NOT NULL,
ALTER COLUMN "seat_pitch" SET NOT NULL,
ALTER COLUMN "seat_type" SET NOT NULL,
ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "flights" DROP COLUMN "arrival_base_timestamp",
DROP COLUMN "departure_base_timestamp",
DROP COLUMN "is_friday",
DROP COLUMN "is_monday",
DROP COLUMN "is_saturday",
DROP COLUMN "is_sunday",
DROP COLUMN "is_thursday",
DROP COLUMN "is_tuesday",
DROP COLUMN "is_wednesday",
ADD COLUMN     "arrival_date" TEXT NOT NULL,
ADD COLUMN     "arrival_timestamp" INTEGER NOT NULL,
ADD COLUMN     "departure_date" TEXT NOT NULL,
ADD COLUMN     "departure_timestamp" INTEGER NOT NULL,
ALTER COLUMN "departure_airport" SET NOT NULL,
ALTER COLUMN "arrival_airport" SET NOT NULL,
ALTER COLUMN "departure_terminal_name" SET NOT NULL,
ALTER COLUMN "arrival_terminal_name" SET NOT NULL,
ALTER COLUMN "flight_number" SET NOT NULL,
ALTER COLUMN "airline_code" SET NOT NULL,
ALTER COLUMN "airplane_code" SET NOT NULL,
ALTER COLUMN "free_baggage" SET NOT NULL,
ALTER COLUMN "cabin_baggage" SET NOT NULL,
ALTER COLUMN "departure_time" SET NOT NULL,
ALTER COLUMN "arrival_time" SET NOT NULL,
ALTER COLUMN "duration_minute" SET NOT NULL,
ALTER COLUMN "class" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;
