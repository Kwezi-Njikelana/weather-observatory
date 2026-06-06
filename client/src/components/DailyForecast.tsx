import type { DailyWeather } from '../types/weather';

interface DailyForecastProps {
  daily: DailyWeather[];
  units: 'metric' | 'imperial';
}

export default function DailyForecast({ daily, units }: DailyForecastProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (str: string) =>
    new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const globalMax = Math.max(...daily.map((d) => d.temp_max));
  const globalMin = Math.min(...daily.map((d) => d.temp_min));
  const globalRange = globalMax - globalMin || 1;

  return (
    <div className="bg-[#1a1d27] border border-[#2e3347] rounded-2xl p-6 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b91a8] mb-4">
        7-Day Forecast
      </p>
      <div className="flex flex-col gap-2">
        {daily.map((day, i) => {
          const barLeft = ((day.temp_min - globalMin) / globalRange) * 100;
          const barWidth = ((day.temp_max - day.temp_min) / globalRange) * 100;

          return (
            <div
              key={i}
              className="grid grid-cols-[90px_28px_44px_1fr_130px] items-center gap-3 bg-[#21253a] rounded-xl px-4 py-3"
            >
            
              <span className="text-sm font-semibold">{formatDay(day.date)}</span>

           
              <img
                src={day.icon}
                alt={`condition-${day.condition_code}`}
                className="w-7 h-7"
              />

              <span className="text-[11px] text-blue-400 text-center">
                {day.precipitation_probability > 0
                  ? `💧${day.precipitation_probability}%`
                  : ''}
              </span>

           
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8b91a8] w-8 text-right">
                  {Math.round(day.temp_min)}{tempUnit}
                </span>
                <div className="flex-1 h-1.5 bg-[#505567] rounded-full relative">
                  <div
                    className="absolute top-0 h-full rounded-full bg-linear-to-r from-blue-400 to-red-400"
                    style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
                  />
                </div>
                <span className="text-xs font-semibold w-8">
                  {Math.round(day.temp_max)}{tempUnit}
                </span>
              </div>

             
              <div className="hidden sm:flex flex-col gap-0.5 text-[11px] text-[#8b91a8]">
                <span>{formatTime(day.sunrise)}</span>
                <span>{formatTime(day.sunset)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}