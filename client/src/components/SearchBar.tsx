import { useState } from 'react';
import { Search } from 'lucide-react';


interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  units: 'metric' | 'imperial';
  onToggleUnits: () => void;
}

export default function SearchBar({ onSearch, loading, units, onToggleUnits }: SearchBarProps) {
  const [query, setQuery] = useState('');

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (query.trim()) onSearch(query.trim());
};
  return (
    <div className="flex items-center gap-3 flex-1 max-w-130">
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="flex items-center bg-[#1a1d27] border border-[#2e3347] rounded-xl px-4 gap-2 focus-within:border-[#5b8dee] transition-colors">
          <span className="text-[#8b91a8] text-base"><Search /></span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none text-[#e8eaf0] text-sm py-3 placeholder:text-[#8b91a8]"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-[#5b8dee] text-white px-4 py-1.5 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-85 transition-opacity"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
      <button
        onClick={onToggleUnits}
        className="bg-[#21253a] text-[#8b91a8] border border-[#2e3347] px-4 py-2.5 rounded-xl text-sm whitespace-nowrap hover:text-[#e8eaf0] hover:border-[#5b8dee] transition-all"
      >
        {units === 'metric' ? '°C → °F' : '°F → °C'}
      </button>
    </div>
  );
}