const axios = require("axios");

const client = axios.create({
  baseURL: process.env.WEATHER_AI_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.WEATHER_AI_API_KEY}`,
  },
  timeout: 10000, // fail after 10s
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

const weatherService = {
  async getCurrentWeather(lat, lon, units = "metric", days = 7) {
    const { data } = await client.get("/v1/weather", {
      params: { lat, lon, units, days, ai: true },
    });
    return data;
  },

async getWeatherByCity(city, units = "metric") {
  const { data } = await client.get("/v1/weather", {
    params: { q: city, units, ai: true },
  });
  return data;
}
};
module.exports = weatherService;