import React, { useEffect } from 'react';
import { Sun, Settings, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSettings } from '../redux/slices/settingsSlice';
import SearchBar from './SearchBar';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/');
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate]);

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 shadow-2xl overflow-visible z-40">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-xy"></div>
      
      {/* Floating Orbs for Visual Interest */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-4 right-1/4 text-yellow-300/40 animate-twinkle" size={16} />
        <Sparkles className="absolute top-8 right-1/3 text-blue-300/40 animate-twinkle delay-500" size={12} />
        <Sparkles className="absolute bottom-6 left-1/4 text-purple-300/40 animate-twinkle delay-1000" size={14} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo Section with Animation */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              {/* Glowing ring around icon */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Sun className="text-white animate-spin-slow" size={32} />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-shimmer">
                Weather Analytics
              </h1>
              <p className="text-xs text-blue-300/70 font-medium tracking-wide uppercase">
                Professional Dashboard
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar />

          {/* Right Section - Auth & Settings */}
          <div className="flex items-center gap-4">
            {/* Google Auth with Glass Effect */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-1 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300">
              <GoogleAuth />
            </div>
            
            {/* Settings Button with Premium Look */}
            <button
              onClick={() => dispatch(toggleSettings())}
              className="relative group p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <Settings 
                size={24} 
                className="relative text-white group-hover:rotate-90 transition-transform duration-500" 
              />
            </button>
          </div>
        </div>

        {/* Subtle Bottom Border with Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 200% 200%;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;