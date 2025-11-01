import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Droplets, Wind, Eye } from 'lucide-react';
import { toggleFavorite, setSelectedCity } from '../redux/slices/weatherSlice';
import { getWeatherIcon } from '../utils/weatherIcons';

const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);
  
  const Icon = getWeatherIcon(city.weather.weather[0].main);
  const isFavorite = favorites.includes(city.name);
  const temp = Math.round(city.weather.main.temp);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleFavorite(city.name));
        }}
        className="absolute top-4 right-4 hover:scale-110 transition-transform"
      >
        <Star 
          size={20} 
          fill={isFavorite ? 'gold' : 'none'} 
          stroke={isFavorite ? 'gold' : 'white'}
        />
      </button>
      
      <div onClick={() => dispatch(setSelectedCity(city))}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{city.name}</h3>
            <p className="text-blue-100 text-sm">{city.weather.sys.country}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon size={48} />
            <div>
              <div className="text-5xl font-bold">{temp}{unitSymbol}</div>
              <div className="text-blue-100 capitalize">
                {city.weather.weather[0].description}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Droplets size={16} />
            <span>{city.weather.main.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={16} />
            <span>{Math.round(city.weather.wind.speed)} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{(city.weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;  // ← Make sure this exists!