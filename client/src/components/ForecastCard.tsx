import type { WeatherResponse } from '../types/weather';

interface ForecastCardProps {
  data: WeatherResponse;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  const today = data.daily[0];
  const totalPrecip = data.daily.reduce((sum, d) => sum + d.precipitation_sum, 0);

  const formatTime = (str: string) =>
    new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const items = [
    { label: "Today's High", value: `${Math.round(today.temp_max)}°` },
    { label: "Today's Low", value: `${Math.round(today.temp_min)}°` },
    { label: 'Precipitation', value: `${today.precipitation_sum} mm` },
    { label: '7-Day Rain Total', value: `${totalPrecip.toFixed(1)} mm` },
    { label: 'Sunrise', value: formatTime(today.sunrise) },
    { label: 'Sunset', value: formatTime(today.sunset) },
  ];

  return (
    <div className="bg-[#1a1d27] border border-[#2e3347] rounded-2xl p-6 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b91a8] mb-4">
        Today at a Glance
      </p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-[#21253a] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs text-[#8b91a8]">{item.label}</span>
            <span className="text-lg font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}