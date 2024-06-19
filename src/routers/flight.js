let flightController = require('../controllers/flight');
const router = require('express').Router();

router.get('/', flightController.getFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
