import axios, { AxiosError } from 'axios';
import type { WeatherResponse } from '../types/weather';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    console.error('[API Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchWeatherByCoords = (
  lat: number,
  lon: number,
  units: string = 'metric'
): Promise<WeatherResponse> =>
  api
    .get<WeatherResponse>(`/weather?lat=${lat}&lon=${lon}&units=${units}`)
    .then((res) => res.data);

export const fetchWeatherByCity = (
  city: string,
  units: string = 'metric'
): Promise<WeatherResponse> =>
  api
    .get<WeatherResponse>(`/weather/city?city=${encodeURIComponent(city)}&units=${units}`)
    .then((res) => res.data);