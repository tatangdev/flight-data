-- CreateTable
CREATE TABLE "airports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airlines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,

    CONSTRAINT "airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airplanes" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "seatLayout" TEXT,
    "seatPitch" TEXT,
    "seatType" TEXT,
    "airlineId" INTEGER,

    CONSTRAINT "airplanes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "id" SERIAL NOT NULL,
    "departure_airport" TEXT NOT NULL,
    "arrival_airport" TEXT NOT NULL,
    "departure_terminal_name" TEXT NOT NULL,
    "arrival_terminal_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "airline_code" TEXT NOT NULL,
    "airplane_code" TEXT NOT NULL,
    "free_baggage" INTEGER NOT NULL,
    "cabin_baggage" INTEGER NOT NULL,
    "departure_date" TEXT NOT NULL,
    "arrival_date" TEXT NOT NULL,
    "departure_time" INTEGER NOT NULL,
    "arrival_time" INTEGER NOT NULL,
    "duration_minute" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);
