export interface Location {
  lat: number;
  lon: number;
  timezone: string;
  requested_lat: number;
  requested_lon: number;
  country: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  wind_speed: number;
  wind_direction: number;
  condition_code: string;
  icon: string;
  humidity?: number;
  feels_like?: number;
  uv_index?: number;
  wind_gust?: number;
  icon_path: string;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  precipitation_probability: number;
  wind_speed: number;
  condition_code: string;
  icon: string;
  humidity: number;
  feels_like: number;
  wind_gust: number;
  uv_index: number;
  icon_path: string;
}

export interface DailyWeather {
  date: string;
  temp_min: number;
  temp_max: number;
  precipitation_sum: number;
  sunrise: string;
  sunset: string;
  condition_code: string;
  icon: string;
  precipitation_probability: number;
  wind_max: number;
  icon_path: string;
}

export interface IpGeo {
  country: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  asn: number;
  org: string;
  ip_hash: string;
  source: string;
}

export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  client_geo: {
    country: string;
    ip_hash: string;
  };
  ip_geo?: IpGeo; 
}