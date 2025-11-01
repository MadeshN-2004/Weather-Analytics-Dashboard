import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Droplets, Wind, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { toggleFavorite, setSelectedCity } from '../redux/slices/weatherSlice';
import { getWeatherIcon } from '../utils/weatherIcons';

const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);
  
  const Icon = getWeatherIcon(city.weather.weather[0].main);
  const isFavorite = favorites.includes(city.name);
  const temp = Math.round(city.weather.main.temp);
  const feelsLike = Math.round(city.weather.main.feels_like);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div 
      onClick={() => dispatch(setSelectedCity(city))}
      className="group relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl border-2 border-blue-400/20 p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-400/50 hover:-translate-y-2 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
      
      {/* Sparkle Effects */}
      <Sparkles className="absolute top-6 left-6 text-yellow-400/30 group-hover:text-yellow-400/60 transition-all duration-500 animate-pulse" size={16} />
      <Sparkles className="absolute bottom-10 right-10 text-blue-400/30 group-hover:text-blue-400/60 transition-all duration-500 animate-pulse delay-300" size={14} />
      
      {/* Favorite Star with Premium Animation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleFavorite(city.name));
        }}
        className="absolute top-6 right-6 p-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-xl transition-all z-10 hover:scale-125 hover:rotate-12 border border-white/10 group/star"
      >
        {/* Star glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-md opacity-0 group-hover/star:opacity-50 transition-opacity"></div>
        
        <Star 
          size={24} 
          fill={isFavorite ? 'url(#starGradient)' : 'none'} 
          stroke={isFavorite ? '#fbbf24' : '#60a5fa'}
          className="relative transition-all duration-300 group-hover/star:animate-pulse"
        />
        
        {/* SVG Gradient Definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </button>
      
      {/* City Info with Enhanced Typography */}
      <div className="relative mb-8">
        <h3 className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
          {city.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
          <p className="text-sm font-bold text-blue-300/80 uppercase tracking-wider">
            {city.weather.sys.country}
          </p>
        </div>
        {/* Accent line */}
        <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
      </div>
      
      {/* Temperature and Icon with Glass Card */}
      <div className="relative flex items-center justify-between mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
        <div className="flex-1">
          {/* Temperature with gradient */}
          <div className="text-7xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
            {temp}{unitSymbol}
          </div>
          
          {/* Weather description */}
          <div className="space-y-2">
            <p className="text-lg text-blue-200 capitalize font-semibold">
              {city.weather.weather[0].description}
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-blue-300/70 font-medium">
                Feels like {feelsLike}{unitSymbol}
              </p>
            </div>
          </div>
        </div>
        
        {/* Weather Icon with Premium Effects */}
        <div className="relative">
          {/* Icon glow */}
          <div className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            <Icon size={100} />
          </div>
          {/* Actual icon */}
          <div className="relative transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
            <Icon size={100} />
          </div>
        </div>
      </div>
      
      {/* Stats Grid with Premium Design */}
      <div className="relative grid grid-cols-3 gap-4 pt-6 border-t border-blue-400/20">
        {[
          { icon: Droplets, value: `${city.weather.main.humidity}%`, label: 'Humidity', color: 'from-blue-500 to-cyan-500' },
          { icon: Wind, value: `${Math.round(city.weather.wind.speed)} m/s`, label: 'Wind', color: 'from-purple-500 to-pink-500' },
          { icon: Eye, value: `${(city.weather.visibility / 1000).toFixed(1)} km`, label: 'Visibility', color: 'from-indigo-500 to-blue-500' }
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className="relative text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group/stat"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Stat icon with gradient background */}
            <div className="relative inline-flex items-center justify-center w-12 h-12 mb-3">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-sm opacity-50 group-hover/stat:opacity-100 transition-opacity`}></div>
              <div className={`relative bg-gradient-to-br ${stat.color} rounded-xl p-2 shadow-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            
            {/* Value */}
            <div className="text-xl font-black text-white mb-1 group-hover/stat:scale-110 transition-transform">
              {stat.value}
            </div>
            
            {/* Label */}
            <div className="text-xs text-blue-300/70 font-semibold uppercase tracking-wider">
              {stat.label}
            </div>
            
            {/* Hover indicator */}
            <div className="absolute inset-0 rounded-xl border-2 border-blue-400/0 group-hover/stat:border-blue-400/30 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Click Indicator with Animation */}
      <div className="relative mt-6 flex items-center justify-center gap-2 text-sm text-blue-300/0 group-hover:text-blue-300/100 transition-all duration-500">
        <span className="font-semibold">Click for detailed forecast</span>
        <ArrowRight size={16} className="animate-pulse group-hover:translate-x-2 transition-transform" />
      </div>

      {/* Bottom Gradient Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>

      <style jsx>{`
        .delay-300 {
          animation-delay: 300ms;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .group:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CityCard;