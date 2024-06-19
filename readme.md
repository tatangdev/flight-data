# Project Overview

This project demonstrates how to use seeder with Prisma JS and implement cron jobs using node-cron and Prisma JS. It covers the following aspects:

- Seeding the database with sample data
- Setting up and running cron jobs for automated tasks
## API Documentation
For detailed information on the API endpoints and how to interact with them, please refer to the [API documentation](https://flight-ticketing.up.railway.app/api-docs). This documentation provides a comprehensive guide on how to use the flight ticketing API and integrate it into your application.

## Seeding the Database

We use three data files for seeding:

1. Airports Data
    - File: `./src/data/airports.json`

    Example data:

    ```json
    [
         {
              "code": "JFK",
              "name": "John F. Kennedy International Airport",
              "city": "New York",
              "country": "USA",
              "latitude": 40.6413,
              "longitude": -73.7781
         }
    ]
    ```

2. Airlines Data
    - File: `./src/data/airlines.json`

    Example data:

    ```json
    [
         {
              "name": "Citilink",
              "short_name": "Citilink",
              "iata": "QG",
              "icon_url": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450350561012-6584b693edd67d75cfc25ecff41c5704.png?tr=q-75"
         }
    ]
    ```

3. Airplanes Data
    - File: `./src/data/airplanes.json`

    Example data:

    ```json
    [
         {
              "model": "Boeing 737",
              "code": "Boeing737-3-3-32",
              "seat_layout": "3-3",
              "seat_pitch": "29",
              "seat_type": "STANDARD_LEGROOM",
              "airline_code": "ID"
         }
    ]
    ```

    Note: Ensure the data structure matches your Prisma schema. Adjust the data as needed to fit your database schema.

## Implementing Cron Jobs

Cron jobs are time-based job schedulers used to automate tasks. In this project, we use a cron job to automatically generate flight data.

### Setting Up the Cron Job

To set up the cron job, add the following script to the `./src/tasks/generateflights.js` file:

```javascript
const cron = require('node-cron');
const moment = require('moment-timezone');
const generateFlights = require('./generateflights');

// Schedule the cron job to run every day at 00:00
cron.schedule('0 0 * * *', () => {
     let date = moment().add(30, 'days').format('YYYY-MM-DD');
     generateFlights(date);
     console.log('Running generateFlights cron job for date:', date);
});
```

This script schedules the `generateFlights` function to run daily at midnight, generating flight data for the next 30 days.

### Manual Flight Data Generation

To manually generate flight data for the next 30 days, add the following code to the `./src/app.js` file:

```javascript
const moment = require('moment-timezone');
const generateFlights = require('./generateflights');

// Generate flight data for the next 30 days
async function main() {
     for (let i = 0; i < 30; i++) {
          let date = moment().add(i, 'days').format('YYYY-MM-DD');
          await generateFlights(date);
     }
}
main();
```

### Running the Script

To run the script, add the following command to your `package.json` file:

```json
"scripts": {
     "generate-flights": "node ./src/tasks/generateflightsforamonth.js"
}
```

Execute the script by running the following command:

```sh
npm run generate-flights
```

By following these instructions, you will be able to seed your database with sample data and set up cron jobs to automate the generation of flight data.

### Another cron example

I have also added another example to test whether the cron job is running or not. Inside the `./src/app.js` file, I have added a default route as follows:

```javascript
// default route
let name = 'World';
app.get('/', (req, res) => {
     res.json({
          status: true,
          message: 'Hello ' + name + '!',
          data: null
     });
});
```

Then, I added a cron job to update the name every minute. So, if you access https://flight-ticketing.up.railway.app at different minutes, you will get a different message.

```javascript
// Test cron job every minute
const random = require('random-name');

cron.schedule('* * * * *', () => {
    name = random.first();
});
```