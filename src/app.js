// api
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
const router = require('./routers/flight');
app.use('/flights', router);

let name = 'World';
app.get('/', (req, res) => {
    res.send('Hello ' + name + '!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// cron
const cron = require('node-cron');
const moment = require('moment-timezone');
const random = require('random-name');
const generateFlights = require('./tasks/generatefligts');

// generate flights every day at 00:00
cron.schedule('0 0 * * *', () => {
    let date = moment().add(30, 'days').format('YYYY-MM-DD');
    generateFlights(date);
    console.log('Running generateFlights cron job for date:', date);
});

// test cron job every minute
cron.schedule('* * * * *', () => {
    name = random.first();
});