import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { setUnit, toggleSettings } from '../redux/slices/settingsSlice';
import { toggleFavorite } from '../redux/slices/weatherSlice';

const SettingsModal = () => {
  const dispatch = useDispatch();
  const { showSettings, unit } = useSelector(state => state.settings);
  const { favorites } = useSelector(state => state.weather);

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button 
            onClick={() => dispatch(toggleSettings())} 
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature Unit
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(setUnit('metric'))}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  unit === 'metric'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => dispatch(setUnit('imperial'))}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  unit === 'imperial'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Favorite Cities</h3>
            {favorites.length === 0 ? (
              <p className="text-sm text-gray-600">No favorites yet</p>
            ) : (
              <div className="space-y-2">
                {favorites.map(city => (
                  <div 
                    key={city} 
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span>{city}</span>
                    <button
                      onClick={() => dispatch(toggleFavorite(city))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;