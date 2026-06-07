const axios = require("axios");

const client = axios.create({
  baseURL: process.env.WEATHER_AI_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.WEATHER_AI_API_KEY}`,
  },
  timeout: 10000, // fail after 10s
});

const geocodingClient = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com",
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => {
    const { headers } = response;
    if (headers["x-ratelimit-remaining"]) {
      console.log(
        `[RateLimit] Remaining: ${headers["x-ratelimit-remaining"]} | ` +
          `Limit: ${headers["x-ratelimit-limit"]} | ` +
          `Resets: ${new Date(headers["x-ratelimit-reset"] * 1000).toISOString()}`,
      );
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    console.error(
      `[WeatherAI API Error] Status: ${status} | Message: ${message}`,
    );
    return Promise.reject(error);
  },
);

async function geocodeCity(city) {
  const { data } = await geocodingClient.get("/v1/search", {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  const location = data.results?.[0];

  if (!location) {
    const error = new Error(`No location found for "${city}"`);
    error.status = 404;
    throw error;
  }

  return location;
}

function mergeResolvedLocation(weatherData, resolvedLocation) {
  return {
    ...weatherData,
    location: {
      ...weatherData.location,
      name: resolvedLocation.name,
      lat: resolvedLocation.latitude,
      lon: resolvedLocation.longitude,
      requested_lat: resolvedLocation.latitude,
      requested_lon: resolvedLocation.longitude,
      country: resolvedLocation.country_code,
      timezone: resolvedLocation.timezone,
    },
  };
}

const weatherService = {
  async getCurrentWeather(lat, lon, units = "metric", days = 7) {
    const { data } = await client.get("/v1/weather", {
      params: { lat, lon, units, days, ai: true },
    });
    return data;
  },

  async getWeatherByCity(city, units = "metric") {
    const resolvedLocation = await geocodeCity(city);
    const data = await this.getCurrentWeather(
      resolvedLocation.latitude,
      resolvedLocation.longitude,
      units,
    );

    return mergeResolvedLocation(data, resolvedLocation);
  },
};
module.exports = weatherService;
