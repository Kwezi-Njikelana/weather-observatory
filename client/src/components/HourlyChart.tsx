import type { HourlyWeather } from '../types/weather';

interface HourlyChartProps {
  hourly: HourlyWeather[];
  units: 'metric' | 'imperial';
}

export default function HourlyChart({ hourly, units }: HourlyChartProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const next24 = hourly.slice(0, 24);

  const temps = next24.map((h) => h.temperature);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  const getBarHeight = (temp: number) =>
    Math.round(20 + ((temp - minTemp) / range) * 60);

  const formatHour = (time: string) => {
    const h = new Date(time).getHours();
    if (h === 0) return '12am';
    if (h === 12) return '12pm';
    return h > 12 ? `${h - 12}pm` : `${h}am`;
  };

  return (
    <div className="bg-[#1a1d27] border border-[#2e3347] rounded-2xl p-6 shadow-xl min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b91a8] mb-4">
        Hourly Forecast
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2e3347]">
        {next24.map((hour, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-13">
            <span className="text-[11px] text-[#8b91a8] whitespace-nowrap">
              {formatHour(hour.time)}
            </span>
            <img
              src={hour.icon}
              alt={`condition-${hour.condition_code}`}
              className="w-7 h-7"
            />
            <div className="h-20 flex items-end">
              <div
                className="w-2 rounded-full bg-linear-to-t from-[#5b8dee] to-[#7c6af7]"
                style={{ height: `${getBarHeight(hour.temperature)}px` }}
              />
            </div>
            <span className="text-xs font-semibold">
              {Math.round(hour.temperature)}{tempUnit}
            </span>
            {hour.precipitation_probability > 20 && (
              <span className="text-[10px] text-blue-400">
                💧{hour.precipitation_probability}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}