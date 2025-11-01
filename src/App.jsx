import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import CityCard from './components/CityCard';
import DetailView from './components/DetailView';
import SettingsModal from './components/SettingsModal';
import { fetchWeatherData } from './redux/thunks/weatherThunks';

const App = () => {
  const dispatch = useDispatch();
  const { cities, isLoading, error, favorites } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);

  // 🔍 DEBUG: Check if API key is loaded
  useEffect(() => {
    console.log('🔑 API Key:', process.env.REACT_APP_WEATHER_API_KEY);
    console.log('🌐 API Base:', process.env.REACT_APP_WEATHER_API_BASE);
    console.log('📊 All Env Variables:', process.env);
  }, []);

  useEffect(() => {
    // Load favorites on mount
    favorites.forEach(city => {
      dispatch(fetchWeatherData({ city, unit }));
    });
  }, []);

  useEffect(() => {
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      cities.forEach(city => {
        if (Date.now() - city.lastUpdated > 60000) {
          dispatch(fetchWeatherData({ city: city.name, unit }));
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [cities, unit, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isLoading && cities.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {cities.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Cities Added</h2>
            <p className="text-gray-600">Search and add cities to see weather data</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map(city => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>
      </main>

      <DetailView />
      <SettingsModal />
    </div>
  );
};

export default App;