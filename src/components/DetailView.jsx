import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Gauge, Droplets, Wind, Eye, Clock, Calendar, CloudRain } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { setSelectedCity } from '../redux/slices/weatherSlice';
import StatCard from './StatCard';

const DetailView = () => {
  const dispatch = useDispatch();
  const { selectedCity } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);

  if (!selectedCity) return null;

  const city = selectedCity;
  const forecast = city.forecast;
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  // Process hourly data (next 24 hours)
  const hourlyData = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
    humidity: item.main.humidity
  }));

  // Process daily data (5 days)
  const dailyData = [];
  for (let i = 0; i < forecast.list.length; i += 8) {
    const day = forecast.list[i];
    dailyData.push({
      day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.main.temp),
      min: Math.round(day.main.temp_min),
      max: Math.round(day.main.temp_max),
      rain: day.rain?.['3h'] || 0
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">{city.name}</h2>
            <p className="text-blue-100">Detailed Weather Analytics</p>
          </div>
          <button
            onClick={() => dispatch(setSelectedCity(null))}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<Gauge size={24} />}
              label="Pressure"
              value={`${city.weather.main.pressure} hPa`}
            />
            <StatCard 
              icon={<Droplets size={24} />}
              label="Humidity"
              value={`${city.weather.main.humidity}%`}
            />
            <StatCard 
              icon={<Wind size={24} />}
              label="Wind Speed"
              value={`${Math.round(city.weather.wind.speed)} m/s`}
            />
            <StatCard 
              icon={<Eye size={24} />}
              label="Visibility"
              value={`${(city.weather.visibility / 1000).toFixed(1)} km`}
            />
          </div>

          {/* Hourly Forecast */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock size={20} />
              24-Hour Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6} 
                  name={`Temperature (${unitSymbol})`} 
                />
                <Area 
                  type="monotone" 
                  dataKey="feels" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.4} 
                  name={`Feels Like (${unitSymbol})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar size={20} />
              5-Day Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="max" fill="#ef4444" name={`Max (${unitSymbol})`} />
                <Bar dataKey="min" fill="#3b82f6" name={`Min (${unitSymbol})`} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Precipitation */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CloudRain size={20} />
              Precipitation Forecast
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rain" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  name="Rain (mm)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;