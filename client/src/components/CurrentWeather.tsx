import type { CurrentWeather as CurrentWeatherType, Location } from '../types/weather';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: Location;
  cityName?: string;
  units: 'metric' | 'imperial';
}

export default function CurrentWeather({ current, location, cityName, units }: CurrentWeatherProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'km/h' : 'mph';
  const displayName = cityName || `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}`;

  const uvIndex = current.uv_index ?? 0;
  const humidity = current.humidity ?? 0;
  const feelsLike = current.feels_like ?? current.temperature;
  const windGust = current.wind_gust ?? 0;

  const time = new Date(current.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getUvLabel = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { label: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { label: 'Very High', color: 'text-red-400' };
    return { label: 'Extreme', color: 'text-purple-400' };
  };

  const uv = getUvLabel(uvIndex);

  const stats = [
    { icon: '💧', value: `${humidity}%`, label: 'Humidity' },
    { icon: '💨', value: `${current.wind_speed} ${windUnit}`, label: 'Wind' },
    { icon: '🌬️', value: `${windGust} ${windUnit}`, label: 'Gusts' },
    {
      icon: '☀️',
      value: (
        <span className={uv.color}>
          {uvIndex.toFixed(1)} · {uv.label}
        </span>
      ),
      label: 'UV Index',
    },
  ];

  return (
    <div className="bg-[#1a1d27] border border-[#2e3347] rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <p className="text-xs text-[#8b91a8] mt-1">
            {location.timezone} · Updated {time}
          </p>
        </div>
        <img
          src={current.icon}
          alt={`condition-${current.condition_code}`}
          className="w-16 h-16"
        />
      </div>

      <div className="mb-5">
        <span className="text-7xl font-extrabold bg-linear-to-br from-white to-[#5b8dee] bg-clip-text text-transparent">
          {Math.round(current.temperature)}{tempUnit}
        </span>
        <p className="text-sm text-[#8b91a8] mt-2">
          Feels like {Math.round(feelsLike)}{tempUnit}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#21253a] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm font-semibold">{s.value}</span>
            <span className="text-xs text-[#8b91a8]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}