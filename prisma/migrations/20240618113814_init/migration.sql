/*
  Warnings:

  - You are about to drop the column `arrival_date` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departure_date` on the `flights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "arrival_date",
DROP COLUMN "departure_date",
ADD COLUMN     "arrival_base_timestamp" INTEGER,
ADD COLUMN     "departure_base_timestamp" INTEGER,
ADD COLUMN     "is_friday" BOOLEAN,
ADD COLUMN     "is_monday" BOOLEAN,
ADD COLUMN     "is_saturday" BOOLEAN,
ADD COLUMN     "is_sunday" BOOLEAN,
ADD COLUMN     "is_thursday" BOOLEAN,
ADD COLUMN     "is_tuesday" BOOLEAN,
ADD COLUMN     "is_wednesday" BOOLEAN,
ALTER COLUMN "departure_airport" DROP NOT NULL,
ALTER COLUMN "arrival_airport" DROP NOT NULL,
ALTER COLUMN "flight_number" DROP NOT NULL,
ALTER COLUMN "airline_code" DROP NOT NULL,
ALTER COLUMN "airplane_code" DROP NOT NULL,
ALTER COLUMN "free_baggage" DROP NOT NULL,
ALTER COLUMN "cabin_baggage" DROP NOT NULL,
ALTER COLUMN "departure_time" DROP NOT NULL,
ALTER COLUMN "departure_time" SET DATA TYPE TEXT,
ALTER COLUMN "arrival_time" DROP NOT NULL,
ALTER COLUMN "arrival_time" SET DATA TYPE TEXT,
ALTER COLUMN "duration_minute" DROP NOT NULL,
ALTER COLUMN "class" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
