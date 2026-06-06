import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastCard from './components/ForecastCard';
import DailyForecast from './components/DailyForecast';
import HourlyChart from './components/HourlyChart';
import { useWeather } from './hooks/useWeather';

export default function App() {
  const { data, loading, error, units, toggleUnits, searchByCity, searchByCoords, selectedCity, } =
    useWeather();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => searchByCity('Nairobi')
      );
    } else {
      searchByCity('Nairobi');
    }
  }, []); 

 const cityName = selectedCity ?? undefined;

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e8eaf0] font-sans">
      <div className="max-w-350 mx-auto px-5">

        {/* Header */}
        <header className="flex items-center justify-between flex-wrap gap-5 py-5 border-b border-[#2e3347]">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⛅</span>
            <span className="text-2xl font-bold bg-linear-to-r from-[#5b8dee] to-[#7c6af7] bg-clip-text text-transparent">
             Weather Observatory
            </span>
          </div>
          <SearchBar
            onSearch={searchByCity}
            loading={loading}
            units={units}
            onToggleUnits={toggleUnits}
          />
        </header>

        {/* Main */}
        <main className="py-7">
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-100 gap-4 text-[#8b91a8]">
              <div className="w-10 h-10 border-4 border-[#2e3347] border-t-[#5b8dee] rounded-full animate-spin" />
              <p>Fetching weather data...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center min-h-100 gap-4 text-[#8b91a8]">
              <span className="text-4xl">⚠️</span>
              <p>{error}</p>
              <button
                onClick={() => searchByCity('Nairobi')}
                className="bg-[#5b8dee] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity"
              >
                Try again
              </button>
            </div>
          )}

          {data && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-5 items-start">
              <div className="flex flex-col gap-5">
                <CurrentWeather
                  current={data.current}
                  location={data.location}
                  cityName={cityName}
                  units={units}
                />
                <ForecastCard data={data} />
              </div>
              <div className="flex flex-col gap-5">
                <HourlyChart hourly={data.hourly} units={units} />
                <DailyForecast daily={data.daily} units={units} />
              </div>
            </div>
          )}

          {!data && !loading && !error && (
            <div className="flex flex-col items-center justify-center min-h-100 gap-3 text-[#8b91a8]">
              <span className="text-5xl">🌍</span>
              <p>Search for a city to get started</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-5 text-center text-xs text-[#8b91a8] border-t border-[#2e3347]">
          Powered by{' '}
          
         <a href="https://weather-ai.co"
            target="_blank"
            rel="noreferrer"
            className="text-[#5b8dee] hover:underline"
          >
            WeatherAI
          </a>
        </footer>
      </div>
    </div>
  );
}