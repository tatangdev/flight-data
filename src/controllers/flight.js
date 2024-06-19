const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getFlights: async (req, res, next) => {
        try {
            let { departure, arrival, date } = req.query;
            
            // validate request
            if (!departure || !arrival || !date) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid request',
                    data: null
                });
            }

            // validate date format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid date format',
                    data: null
                });
            }

            const results = await prisma.$queryRaw`
            SELECT 
                flights.id,
                flights.departure_terminal_name,
                flights.arrival_terminal_name,
                flights.flight_number,
                flights.free_baggage,
                flights.cabin_baggage,
                flights.departure_date,
                flights.arrival_date,
                flights.departure_time,
                flights.arrival_time,
                flights.departure_timestamp,
                flights.arrival_timestamp,
                flights.duration_minute,
                flights.class,
                flights.price,

                departure.id           AS departure_airport_id,
                departure.name         AS departure_airport_name,
                departure.iata         AS departure_airport_iata,
                departure.city         AS departure_airport_city,
                departure.country      AS departure_airport_country,
                departure.timezone     AS departure_airport_timezone,

                arrival.id             AS arrival_airport_id,
                arrival.name           AS arrival_airport_name,
                arrival.iata           AS arrival_airport_iata,
                arrival.city           AS arrival_airport_city,
                arrival.country        AS arrival_airport_country,
                arrival.timezone       AS arrival_airport_timezone,

                airlines.id            AS airline_id,
                airlines.name          AS airline_name,
                airlines.short_name    AS airline_short_name,
                airlines.iata          AS airline_iata,
                airlines.icon_url      AS airline_icon_url,

                airplanes.id           AS airplane_id,
                airplanes.model        AS airplane_model,
                airplanes.code         AS airplane_code,
                airplanes.seat_layout  AS airplane_seat_layout,
                airplanes.seat_pitch   AS airplane_seat_pitch,
                airplanes.seat_type    AS airplane_seat_type,
                airplanes.airline_code AS airplane_airline_code
            FROM 
                flights
                INNER JOIN airlines ON airlines.iata = flights.airline_code
                INNER JOIN airplanes ON airplanes.code = flights.airplane_code AND airplanes.airline_code = airlines.iata
                INNER JOIN airports departure ON departure.iata = flights.departure_airport
                INNER JOIN airports arrival ON arrival.iata = flights.arrival_airport
            WHERE 
                flights.departure_airport = ${departure}
                AND flights.arrival_airport = ${arrival}
                AND flights.departure_date = ${date};`;

            let response = results.map(result => {
                return {
                    id: result.id,
                    flight_number: result.flight_number,
                    free_baggage: result.free_baggage,
                    cabin_baggage: result.cabin_baggage,
                    duration_minute: result.duration_minute,
                    class: result.class,
                    price: result.price,
                    departure: {
                        airport: {
                            id: result.departure_airport_id,
                            name: result.departure_airport_name,
                            terminal_name: result.departure_terminal_name,
                            iata: result.departure_airport_iata,
                            city: result.departure_airport_city,
                            country: result.departure_airport_country,
                            timezone: result.departure_airport_timezone,
                        },
                        departure_date: result.departure_date,
                        departure_time: result.departure_time,
                        departure_timestamp: result.departure_timestamp,
                    },
                    arrival: {
                        airport: {
                            id: result.arrival_airport_id,
                            name: result.arrival_airport_name,
                            terminal_name: result.arrival_terminal_name,
                            iata: result.arrival_airport_iata,
                            city: result.arrival_airport_city,
                            country: result.arrival_airport_country,
                            timezone: result.arrival_airport_timezone,
                        },
                        arrival_date: result.arrival_date,
                        arrival_time: result.arrival_time,
                        arrival_timestamp: result.arrival_timestamp,
                    },
                    airline: {
                        id: result.airline_id,
                        name: result.airline_name,
                        short_name: result.airline_short_name,
                        iata: result.airline_iata,
                        icon_url: result.airline_icon_url,
                    },
                    airplane: {
                        id: result.airplane_id,
                        model: result.airplane_model,
                        code: result.airplane_code,
                        seat_layout: result.airplane_seat_layout,
                        seat_pitch: result.airplane_seat_pitch,
                        seat_type: result.airplane_seat_type,
                        airline_code: result.airplane_airline_code,
                    },
                };
            });

            res.status(200).json({
                status: true,
                message: 'Flight found',
                data: response
            });
        } catch (error) {
            next(error);
        }
    },
    getFlightById: async (req, res, next) => {
        try {
            let { id } = req.params;
            const results = await prisma.$queryRaw`
            SELECT 
                flights.id,
                flights.departure_terminal_name,
                flights.arrival_terminal_name,
                flights.flight_number,
                flights.free_baggage,
                flights.cabin_baggage,
                flights.departure_date,
                flights.arrival_date,
                flights.departure_time,
                flights.arrival_time,
                flights.departure_timestamp,
                flights.arrival_timestamp,
                flights.duration_minute,
                flights.class,
                flights.price,

                departure.id           AS departure_airport_id,
                departure.name         AS departure_airport_name,
                departure.iata         AS departure_airport_iata,
                departure.city         AS departure_airport_city,
                departure.country      AS departure_airport_country,
                departure.timezone     AS departure_airport_timezone,

                arrival.id             AS arrival_airport_id,
                arrival.name           AS arrival_airport_name,
                arrival.iata           AS arrival_airport_iata,
                arrival.city           AS arrival_airport_city,
                arrival.country        AS arrival_airport_country,
                arrival.timezone       AS arrival_airport_timezone,

                airlines.id            AS airline_id,
                airlines.name          AS airline_name,
                airlines.short_name    AS airline_short_name,
                airlines.iata          AS airline_iata,
                airlines.icon_url      AS airline_icon_url,

                airplanes.id           AS airplane_id,
                airplanes.model        AS airplane_model,
                airplanes.code         AS airplane_code,
                airplanes.seat_layout  AS airplane_seat_layout,
                airplanes.seat_pitch   AS airplane_seat_pitch,
                airplanes.seat_type    AS airplane_seat_type,
                airplanes.airline_code AS airplane_airline_code
            FROM 
                flights
                INNER JOIN airlines ON airlines.iata = flights.airline_code
                INNER JOIN airplanes ON airplanes.code = flights.airplane_code AND airplanes.airline_code = airlines.iata
                INNER JOIN airports departure ON departure.iata = flights.departure_airport
                INNER JOIN airports arrival ON arrival.iata = flights.arrival_airport
            WHERE 
                flights.id = ${Number(id)};`;

            let response = results.map(result => {
                return {
                    id: result.id,
                    flight_number: result.flight_number,
                    free_baggage: result.free_baggage,
                    cabin_baggage: result.cabin_baggage,
                    duration_minute: result.duration_minute,
                    class: result.class,
                    price: result.price,
                    departure: {
                        airport: {
                            id: result.departure_airport_id,
                            name: result.departure_airport_name,
                            terminal_name: result.departure_terminal_name,
                            iata: result.departure_airport_iata,
                            city: result.departure_airport_city,
                            country: result.departure_airport_country,
                            timezone: result.departure_airport_timezone,
                        },
                        departure_date: result.departure_date,
                        departure_time: result.departure_time,
                        departure_timestamp: result.departure_timestamp,
                    },
                    arrival: {
                        airport: {
                            id: result.arrival_airport_id,
                            name: result.arrival_airport_name,
                            terminal_name: result.arrival_terminal_name,
                            iata: result.arrival_airport_iata,
                            city: result.arrival_airport_city,
                            country: result.arrival_airport_country,
                            timezone: result.arrival_airport_timezone,
                        },
                        arrival_date: result.arrival_date,
                        arrival_time: result.arrival_time,
                        arrival_timestamp: result.arrival_timestamp,
                    },
                    airline: {
                        id: result.airline_id,
                        name: result.airline_name,
                        short_name: result.airline_short_name,
                        iata: result.airline_iata,
                        icon_url: result.airline_icon_url,
                    },
                    airplane: {
                        id: result.airplane_id,
                        model: result.airplane_model,
                        code: result.airplane_code,
                        seat_layout: result.airplane_seat_layout,
                        seat_pitch: result.airplane_seat_pitch,
                        seat_type: result.airplane_seat_type,
                        airline_code: result.airplane_airline_code,
                    },
                };
            });

            if (response.length === 0) {
                res.status(400).json({
                    status: false,
                    message: 'Flight not found',
                    data: null
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Flight found',
                    data: response[0]
                });
            }
        } catch (error) {
            next(error);
        }
    }
};