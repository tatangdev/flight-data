require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient({ log: ['query'] });
const prisma = new PrismaClient();
const moment = require('moment-timezone');

const rawFlights = require('./data/flights.json');

async function generateFlights(date) {
    // Convert date to timestamp in the 'Asia/Jakarta' timezone using moment-timezone
    let timestamp = moment.tz(date, 'YYYY-MM-DD', 'Asia/Jakarta').unix();

    // check if flights already generated
    let isFlightsGenerated = await prisma.flight.findFirst({
        where: {
            departure_date: date,
        }
    });
    if (isFlightsGenerated) {
        console.log('Flights already generated');
        return;
    }

    let airports = await prisma.airport.findMany();
    let airportTimezoneMap = {};
    airports.forEach(airport => {
        airportTimezoneMap[airport.iata] = airport.timezone;
    });

    // get day from timestamp
    let day = moment.unix(timestamp).day();
    let flights = rawFlights.filter(flight => {
        switch (day) {
            case 0:
                return flight.is_sunday;
            case 1:
                return flight.is_monday;
            case 2:
                return flight.is_tuesday;
            case 3:
                return flight.is_wednesday;
            case 4:
                return flight.is_thursday;
            case 5:
                return flight.is_friday;
            case 6:
                return flight.is_saturday;
        }
    });

    flights = flights.map(flight => {
        let departureTimestamp = moment.tz(`${date} ${flight.departure_time}`, 'YYYY-MM-DD HH:mm', airportTimezoneMap[flight.departure_airport]).unix();
        let arrivalTimestamp = moment.tz(`${date} ${flight.arrival_time}`, 'YYYY-MM-DD HH:mm', airportTimezoneMap[flight.arrival_airport]).unix();

        if (arrivalTimestamp < departureTimestamp) {
            arrivalTimestamp += 86400; // add 1 day
        }

        let durationMinute = Math.floor((arrivalTimestamp - departureTimestamp) / 60);
        let departureDate = moment.unix(departureTimestamp).format('YYYY-MM-DD');
        let arrivalDate = moment.unix(arrivalTimestamp).format('YYYY-MM-DD');

        return {
            departure_airport: flight.departure_airport,
            arrival_airport: flight.arrival_airport,
            departure_terminal_name: flight.departure_terminal_name,
            arrival_terminal_name: flight.arrival_terminal_name,
            flight_number: flight.flight_number,
            airline_code: flight.airline_code,
            airplane_code: flight.airplane_code,
            free_baggage: flight.free_baggage,
            cabin_baggage: flight.cabin_baggage,
            departure_date: departureDate,
            arrival_date: arrivalDate,
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            departure_timestamp: departureTimestamp,
            arrival_timestamp: arrivalTimestamp,
            duration_minute: durationMinute,
            class: flight.class,
            price: flight.price,
        };
    });

    await prisma.flight.createMany({ data: flights });
}

// generateFlights('2024-06-24');
// generateFlights('2024-06-25');
// generateFlights('2024-06-26');
// generateFlights('2024-06-27');
generateFlights('2024-06-28');
// generateFlights('2024-06-29');
// generateFlights('2024-06-30');
