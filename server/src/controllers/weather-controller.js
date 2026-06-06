const weatherService = require('../services/weather-service');

const weatherController = {
  async getWeather(req, res, next) {
    try {
      const { lat, lon, units = 'metric', days = 7 } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({ error: 'lat and lon query params are required' });
      }

      const data = await weatherService.getCurrentWeather(
        parseFloat(lat),
        parseFloat(lon),
        units,
        parseInt(days)
      );

      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getWeatherByCity(req, res, next) {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'city query param is required' });
    }

    const data = await weatherService.getWeatherByCity(city, units);
    res.json(data);
  } catch (err) {
    next(err);
  }
},

};

module.exports = weatherController;