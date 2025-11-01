import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Gauge, Droplets, Wind, Eye, Clock, Calendar, CloudRain, Thermometer, Navigation, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { setSelectedCity } from '../redux/slices/weatherSlice';
import StatCard from '../components/StatCard';
import { calculateDewPoint, getWindDirection } from '../utils/formatters';

const DetailView = () => {
  const dispatch = useDispatch();
  const { selectedCity } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);

  if (!selectedCity) return null;

  const city = selectedCity;
  const forecast = city.forecast;
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  
  // Calculate dew point
  const dewPoint = calculateDewPoint(city.weather.main.temp, city.weather.main.humidity);

  // Process hourly data (next 24 hours)
  const hourlyData = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
    humidity: item.main.humidity,
    wind: Math.round(item.wind.speed)
  }));

  // Process daily data (5 days)
  const dailyData = [];
  for (let i = 0; i < forecast.list.length; i += 8) {
    const day = forecast.list[i];
    dailyData.push({
      day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      date: new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp: Math.round(day.main.temp),
      min: Math.round(day.main.temp_min),
      max: Math.round(day.main.temp_max),
      rain: day.rain?.['3h'] || 0,
      humidity: day.main.humidity,
      wind: Math.round(day.wind.speed)
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-400/30 shadow-2xl relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <Sparkles className="absolute top-6 left-6 text-yellow-400/40 animate-twinkle" size={20} />
          <Sparkles className="absolute bottom-10 right-10 text-blue-400/40 animate-twinkle delay-500" size={16} />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-xl text-white p-8 rounded-t-3xl flex justify-between items-center z-10 border-b-2 border-white/10">
          <div>
            <h2 className="text-4xl font-black mb-2">{city.name}</h2>
            <p className="text-blue-100 text-lg font-semibold flex items-center gap-2">
              <Sparkles size={16} className="animate-pulse" />
              Detailed Weather Analytics
            </p>
          </div>
          <button
            onClick={() => dispatch(setSelectedCity(null))}
            className="group p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <X size={28} className="group-hover:text-red-300" />
          </button>
        </div>

        <div className="relative z-10 p-8 space-y-8">
          {/* Current Stats - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
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
              icon={<Thermometer size={24} />}
              label="Dew Point"
              value={`${dewPoint}${unitSymbol}`}
            />
            <StatCard 
              icon={<Eye size={24} />}
              label="Visibility"
              value={`${(city.weather.visibility / 1000).toFixed(1)} km`}
            />
          </div>

          {/* Wind Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn delay-100">
            <StatCard 
              icon={<Wind size={24} />}
              label="Wind Speed"
              value={`${Math.round(city.weather.wind.speed)} m/s`}
            />
            <StatCard 
              icon={<Navigation size={24} />}
              label="Wind Direction"
              value={`${getWindDirection(city.weather.wind.deg)} (${city.weather.wind.deg}°)`}
            />
            <StatCard 
              icon={<Thermometer size={24} />}
              label="Feels Like"
              value={`${Math.round(city.weather.main.feels_like)}${unitSymbol}`}
            />
          </div>

          {/* Hourly Forecast */}
          <div className="glass-dark rounded-2xl p-8 animate-fadeIn delay-200 border border-white/10">
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Clock size={24} />
              </div>
              24-Hour Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3b82f6" 
                  fill="url(#tempGradient)"
                  strokeWidth={3}
                  name={`Temperature (${unitSymbol})`} 
                />
                <Area 
                  type="monotone" 
                  dataKey="feels" 
                  stroke="#8b5cf6" 
                  fill="url(#feelsGradient)"
                  strokeWidth={3}
                  name={`Feels Like (${unitSymbol})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 5-Day Forecast */}
          <div className="glass-dark rounded-2xl p-8 animate-fadeIn delay-300 border border-white/10">
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Calendar size={24} />
              </div>
              5-Day Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900/95 p-4 border border-purple-400/30 rounded-xl shadow-2xl backdrop-blur-xl">
                          <p className="font-bold text-white mb-2">{payload[0].payload.date}</p>
                          <p className="text-red-400 font-semibold">Max: {payload[0].value}{unitSymbol}</p>
                          <p className="text-blue-400 font-semibold">Min: {payload[1].value}{unitSymbol}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="max" fill="#ef4444" name={`Max (${unitSymbol})`} radius={[8, 8, 0, 0]} />
                <Bar dataKey="min" fill="#3b82f6" name={`Min (${unitSymbol})`} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Precipitation */}
          <div className="glass-dark rounded-2xl p-8 animate-fadeIn delay-400 border border-white/10">
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <CloudRain size={24} />
              </div>
              Precipitation Forecast
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900/95 p-4 border border-green-400/30 rounded-xl shadow-2xl backdrop-blur-xl">
                          <p className="font-bold text-white mb-2">{payload[0].payload.date}</p>
                          <p className="text-green-400 font-semibold">Rain: {payload[0].value} mm</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rain" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  name="Rain (mm)"
                  dot={{ fill: '#10b981', r: 6, strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity & Wind Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn delay-500">
            {/* Humidity Trend */}
            <div className="glass-dark rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-black text-white mb-6">Humidity Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis domain={[0, 100]} stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="#06b6d4" 
                    strokeWidth={3} 
                    name="Humidity (%)"
                    dot={{ fill: '#06b6d4', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Wind Speed Trend */}
            <div className="glass-dark rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-black text-white mb-6">Wind Speed Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wind" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    name="Wind (m/s)"
                    dot={{ fill: '#f59e0b', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-3xl"></div>
      </div>
    </div>
  );
};

export default DetailView;