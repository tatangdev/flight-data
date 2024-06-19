require('dotenv').config();
const { PORT } = process.env;
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const cron = require('node-cron');
const moment = require('moment-timezone');
const random = require('random-name');
const generateFlights = require('./tasks/generatefligts');
const router = require('./routers/flight');

// Import dependencies

// Read Swagger file
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();

app.use(cors());
app.use('/flights', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// default route
let name = 'World';
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Hello ' + name + '!',
        data: null
    });
});

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

// Schedule cron jobs
// Generate flights every day at 00:00
cron.schedule('0 0 * * *', () => {
    let date = moment().add(30, 'days').format('YYYY-MM-DD');
    generateFlights(date);
    console.log('Running generateFlights cron job for date:', date);
});

// Test cron job every minute
cron.schedule('* * * * *', () => {
    name = random.first();
});
