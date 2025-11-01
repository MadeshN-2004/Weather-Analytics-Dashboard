import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, Sparkles, LogOut, User } from 'lucide-react';
import Header from '../components/Header';
import CityCard from '../components/CityCard';
import DetailView from '../components/DetailView';
import SettingsModal from '../components/SettingsModal';
import { fetchWeatherData } from '../redux/thunks/weatherThunks';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cities, isLoading, error, favorites } = useSelector(state => state.weather);
  const { unit } = useSelector(state => state.settings);
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('✅ User authenticated:', parsedUser.name);
        setIsAuthenticating(false);
      } catch (error) {
        console.error('❌ Error loading user:', error);
        localStorage.removeItem('user');
        setIsAuthenticating(false);
        navigate('/');
      }
    } else {
      console.log('⚠️ No user found, redirecting to home...');
      setIsAuthenticating(false);
      navigate('/');
    }
  }, [navigate]);

  // Debug: Check API key
  useEffect(() => {
    console.log('🔑 API Key:', process.env.REACT_APP_WEATHER_API_KEY);
    console.log('🌐 API Base:', process.env.REACT_APP_WEATHER_API_BASE);
  }, []);

  useEffect(() => {
    // Load favorites on mount
    if (user && favorites.length > 0) {
      favorites.forEach(city => {
        dispatch(fetchWeatherData({ city, unit }));
      });
    }
  }, [user]);

  useEffect(() => {
    // Auto-refresh every 60 seconds
    if (!user) return;

    const interval = setInterval(() => {
      cities.forEach(city => {
        if (Date.now() - city.lastUpdated > 60000) {
          dispatch(fetchWeatherData({ city: city.name, unit }));
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [cities, unit, dispatch, user]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    console.log('✅ User signed out, redirecting to home...');
    navigate('/');
  };

  // Loading state while checking authentication
  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-pulse"></div>
            <div className="relative inline-block animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-400 border-r-cyan-400"></div>
          </div>
          <p className="text-blue-300 text-2xl font-bold animate-pulse">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if no user (will redirect anyway)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <Sparkles className="absolute top-10 right-1/4 text-yellow-400/30 animate-twinkle" size={16} />
        <Sparkles className="absolute bottom-20 left-1/3 text-blue-400/30 animate-twinkle delay-500" size={14} />
      </div>

      {/* Top Navigation Bar with User Profile */}
      <div className="relative z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-xl border-2 border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 text-blue-200 hover:text-white shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold">Back to Home</span>
            </button>

            {/* User Profile Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  title={user.email}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs text-blue-300">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-fadeIn">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Welcome back, {user.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-blue-300">
                {cities.length > 0 
                  ? `Tracking weather for ${cities.length} ${cities.length === 1 ? 'city' : 'cities'}`
                  : 'Start by adding your favorite cities below'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 backdrop-blur-xl border-2 border-red-400/30 text-red-200 px-6 py-4 rounded-2xl mb-6 animate-fadeIn shadow-xl">
            <p className="font-bold flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && cities.length === 0 && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl animate-pulse"></div>
              <div className="relative inline-block animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-400 border-r-purple-500"></div>
            </div>
            <p className="text-2xl text-blue-200 font-bold animate-pulse">Loading weather data...</p>
          </div>
        )}

        {/* Empty State */}
        {cities.length === 0 && !isLoading && (
          <div className="text-center py-32 animate-fadeIn">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl"></div>
              <Cloud size={100} className="relative text-blue-400 animate-float" />
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              No Cities Added
            </h2>
            <p className="text-xl text-blue-300/70 max-w-md mx-auto">
              Search and add cities using the search bar above to see weather data
            </p>
          </div>
        )}

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CityCard city={city} />
            </div>
          ))}
        </div>
      </main>

      <DetailView />
      <SettingsModal />

      <style jsx>{`
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;