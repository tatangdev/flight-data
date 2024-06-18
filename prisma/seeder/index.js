const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

const airports = require('../../src/data/airports.json');
const airlines = require('../../src/data/airlines.json');
const airplanes = require('../../src/data/airplanes.json');

async function main() {
    // generate airports
    await prisma.airport.createMany({
        data: airports,
        skipDuplicates: true,
    });

    // generate airlines
    await prisma.airline.createMany({
        data: airlines,
        skipDuplicates: true,
    });

    // generate airplanes
    await prisma.airplane.createMany({
        data: airplanes,
        skipDuplicates: true,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });