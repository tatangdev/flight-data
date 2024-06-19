-- CreateTable
CREATE TABLE "airports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT,

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
    "code" TEXT NOT NULL,
    "seat_layout" TEXT NOT NULL,
    "seat_pitch" TEXT NOT NULL,
    "seat_type" TEXT NOT NULL,
    "airline_code" TEXT NOT NULL,

    CONSTRAINT "airplanes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "id" SERIAL NOT NULL,
    "departure_airport" TEXT,
    "arrival_airport" TEXT,
    "departure_terminal_name" TEXT,
    "arrival_terminal_name" TEXT,
    "flight_number" TEXT,
    "airline_code" TEXT,
    "airplane_code" TEXT,
    "free_baggage" INTEGER,
    "cabin_baggage" INTEGER,
    "departure_date" TEXT,
    "arrival_date" TEXT,
    "departure_time" TEXT,
    "arrival_time" TEXT,
    "departure_timestamp" INTEGER,
    "arrival_timestamp" INTEGER,
    "duration_minute" INTEGER,
    "class" TEXT,
    "price" INTEGER,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);
