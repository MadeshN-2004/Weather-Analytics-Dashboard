import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronRight, MapPin, Loader, Navigation } from 'lucide-react';
import { searchCities } from '../redux/thunks/weatherThunks';
import { fetchWeatherData } from '../redux/thunks/weatherThunks';
import { clearSearchResults } from '../redux/slices/weatherSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { searchResults } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);

  useEffect(() => {
    if (query.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        dispatch(searchCities(query));
        setIsSearching(false);
      }, 300);
      return () => {
        clearTimeout(timer);
        setIsSearching(false);
      };
    } else {
      dispatch(clearSearchResults());
      setIsSearching(false);
    }
  }, [query, dispatch]);

  const handleAddCity = (cityName) => {
    dispatch(fetchWeatherData({ city: cityName, unit }));
    setQuery('');
    dispatch(clearSearchResults());
  };

  return (
    <div className="relative w-full md:w-[500px] group z-50">
      {/* Search Container with Glass Morphism */}
      <div className="relative">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
        
        {/* Search icon with pulse animation */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-0 group-focus-within:opacity-50 animate-pulse"></div>
            <Search 
              className="relative text-blue-300 group-focus-within:text-blue-400 transition-colors" 
              size={22} 
            />
          </div>
        </div>
        
        {/* Loading spinner with gradient */}
        {isSearching && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm animate-pulse"></div>
              <Loader 
                className="relative text-blue-400 animate-spin" 
                size={20} 
              />
            </div>
          </div>
        )}
        
        {/* Input Field with Glass Effect */}
        <input
          type="text"
          placeholder="Search cities worldwide..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="relative w-full pl-14 pr-14 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:scale-[1.02]"
        />
        
        {/* Animated bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
      </div>
      
      {/* Search Results Dropdown with Premium Design */}
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-4 w-full bg-gradient-to-br from-slate-900/95 via-blue-950/95 to-indigo-950/95 backdrop-blur-xl border-2 border-blue-400/30 rounded-2xl shadow-2xl z-[9999] overflow-hidden animate-slideDown">
          {/* Glow effect for dropdown */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>
          
          {/* Results Header with Gradient */}
          <div className="relative px-6 py-3 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-indigo-900/50 border-b border-blue-400/20">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Navigation size={16} className="animate-bounce" />
                Search Results
              </p>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
                {searchResults.length} Found
              </span>
            </div>
          </div>
          
          {/* Results List with Stagger Animation */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {searchResults.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleAddCity(result.name)}
                className="relative w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-blue-600/20 hover:via-purple-600/20 hover:to-pink-600/20 transition-all duration-300 flex items-center justify-between group/item border-b border-blue-400/10 last:border-0 animate-fadeIn"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover/item:from-blue-500/10 group-hover/item:via-purple-500/10 group-hover/item:to-pink-500/10 transition-all duration-300"></div>
                
                <div className="relative flex items-center gap-4">
                  {/* Location Icon with Gradient Background */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-sm opacity-50 group-hover/item:opacity-100 transition-opacity"></div>
                    <div className="relative p-3 bg-gradient-to-br from-blue-600/80 to-purple-600/80 rounded-xl group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300 shadow-lg">
                      <MapPin size={20} className="text-white" />
                    </div>
                  </div>
                  
                  {/* City Info */}
                  <div>
                    <div className="font-bold text-white text-lg group-hover/item:text-blue-300 transition-colors">
                      {result.name}
                    </div>
                    <div className="text-sm text-blue-300/70 flex items-center gap-2 mt-1">
                      <span className="inline-block w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                      <span className="font-medium">{result.sys.country}</span>
                    </div>
                  </div>
                </div>
                
                {/* Arrow Icon with Animation */}
                <div className="relative">
                  <ChevronRight 
                    size={24} 
                    className="text-blue-400/50 group-hover/item:text-blue-300 group-hover/item:translate-x-2 transition-all duration-300" 
                  />
                </div>
              </button>
            ))}
          </div>
          
          {/* Bottom Gradient Accent */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default SearchBar;