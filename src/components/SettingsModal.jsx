import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Thermometer, Star, Trash2 } from 'lucide-react';
import { setUnit, toggleSettings } from '../redux/slices/settingsSlice';
import { toggleFavorite } from '../redux/slices/weatherSlice';

const SettingsModal = () => {
  const dispatch = useDispatch();
  const { showSettings, unit } = useSelector(state => state.settings);
  const { favorites } = useSelector(state => state.weather);

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111722] rounded-xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-white dark:bg-[#111722] border-b border-slate-200 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
              <p className="text-slate-500 dark:text-[#92a4c9] text-sm mt-1">
                Customize your experience
              </p>
            </div>
            <button 
              onClick={() => dispatch(toggleSettings())} 
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          
          {/* Temperature Unit Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">
              <Thermometer size={18} className="text-[#135bec]" />
              Temperature Unit
            </label>
            
            {/* Unit Selector Buttons */}
            <div className="flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#232f48] p-1">
              <button
                onClick={() => dispatch(setUnit('metric'))}
                className={`flex-1 h-full rounded-md px-4 text-sm font-medium transition-all ${
                  unit === 'metric'
                    ? 'bg-white dark:bg-[#111722] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-[#92a4c9]'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => dispatch(setUnit('imperial'))}
                className={`flex-1 h-full rounded-md px-4 text-sm font-medium transition-all ${
                  unit === 'imperial'
                    ? 'bg-white dark:bg-[#111722] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-[#92a4c9]'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
              <Star size={18} className="text-[#135bec]" />
              Favorite Cities
              <span className="ml-auto text-xs bg-slate-100 dark:bg-[#232f48] text-slate-700 dark:text-white px-2 py-1 rounded-full">
                {favorites.length}
              </span>
            </h3>
            
            {/* Empty State */}
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-[#232f48] rounded-full mb-3">
                  <Star size={24} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-[#92a4c9] font-medium">No favorites yet</p>
                <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-1">Star cities to add them here</p>
              </div>
            ) : (
              /* Favorites List */
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {favorites.map((city) => (
                  <div 
                    key={city} 
                    className="flex items-center justify-between p-3 bg-slate-100 dark:bg-[#232f48] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Star size={16} className="text-[#135bec]" fill="#135bec" />
                      <span className="font-medium text-slate-900 dark:text-white">{city}</span>
                    </div>
                    <button
                      onClick={() => dispatch(toggleFavorite(city))}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
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