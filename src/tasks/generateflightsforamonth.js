const moment = require('moment-timezone');
const generateFlights = require('./generatefligts');

// generate date for the next 30 days
async function main() {
    for (let i = 0; i < 30; i++) {
        let date = moment().add(i, 'days').format('YYYY-MM-DD');
        generateFlights(date);
    }
}
main();