import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronRight } from 'lucide-react';
import { searchCities } from '../redux/thunks/weatherThunks';
import { fetchWeatherData } from '../redux/thunks/weatherThunks';
import { clearSearchResults } from '../redux/slices/weatherSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { searchResults } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        dispatch(searchCities(query));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handleAddCity = (cityName) => {
    dispatch(fetchWeatherData({ city: cityName, unit }));
    setQuery('');
    dispatch(clearSearchResults());
  };

  return (
    <div className="relative w-full md:w-96">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {searchResults.map((result) => (
            <button
              key={result.id}
              onClick={() => handleAddCity(result.name)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-600">{result.sys.country}</div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;