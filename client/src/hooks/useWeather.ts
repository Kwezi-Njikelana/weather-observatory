import { useState, useCallback } from 'react';
import type { WeatherResponse } from '../types/weather';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/api';

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const searchByCity = useCallback(
    async (city: string) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fetchWeatherByCity(city, units);
        setState({ data, loading: false, error: null });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch weather data';
        setState({ data: null, loading: false, error: message });
      }
    },
    [units]
  );

  const searchByCoords = useCallback(
    async (lat: number, lon: number) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fetchWeatherByCoords(lat, lon, units);
        setState({ data, loading: false, error: null });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch weather data';
        setState({ data: null, loading: false, error: message });
      }
    },
    [units]
  );

  const toggleUnits = useCallback(() => {
    setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  }, []);

  return {
    ...state,
    units,
    toggleUnits,
    searchByCity,
    searchByCoords,
  };
}