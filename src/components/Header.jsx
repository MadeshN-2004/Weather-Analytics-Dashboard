import React from 'react';
import { Sun, Settings } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleSettings } from '../redux/slices/settingsSlice';
import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sun className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Weather Analytics</h1>
          </div>
          
          <SearchBar />

          <button
            onClick={() => dispatch(toggleSettings())}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;  // ← Make sure this line exists!