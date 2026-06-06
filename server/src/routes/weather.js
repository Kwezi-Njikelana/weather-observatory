const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather-controller');

router.get('/', weatherController.getWeather);
router.get('/city', weatherController.getWeatherByCity);

module.exports = router;