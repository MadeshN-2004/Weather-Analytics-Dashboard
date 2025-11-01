import React, { useState, useEffect, useRef } from 'react';
import { Cloud, CloudRain, Sun, Wind, MapPin, TrendingUp, Zap, ArrowRight, Droplets, Eye, Sparkles, Star, Activity } from 'lucide-react';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);

    // Check for existing user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
      }
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Google Sign-In Initialization
  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.error('❌ Google Client ID is missing! Add REACT_APP_GOOGLE_CLIENT_ID to your .env file');
      return;
    }

    if (clientId.startsWith('http')) {
      console.error('❌ Client ID should NOT start with http:// or https://');
      return;
    }

    // Prevent duplicate initialization
    if (window.googleSignInInitialized) {
      console.log('⚠️ Google Sign-In already initialized');
      return;
    }

    const initializeGoogleSignIn = () => {
      if (!window.google) {
        console.error('❌ Google Sign-In script not loaded yet');
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.googleSignInInitialized = true;
        console.log('✅ Google Sign-In initialized successfully');

        // Render Google Sign-In buttons
        renderGoogleButtons();
      } catch (error) {
        console.error('❌ Error initializing Google Sign-In:', error);
        window.googleSignInInitialized = false;
      }
    };

    const renderGoogleButtons = () => {
      // Render button in navigation
      const navButton = document.getElementById('googleSignInButtonNav');
      if (navButton && !navButton.hasChildNodes()) {
        window.google.accounts.id.renderButton(navButton, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 200
        });
      }

      // Render button in hero section
      const heroButton = document.getElementById('googleSignInButtonHero');
      if (heroButton && !heroButton.hasChildNodes()) {
        window.google.accounts.id.renderButton(heroButton, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 250
        });
      }

      // Render button in final CTA
      const finalButton = document.getElementById('googleSignInButtonFinal');
      if (finalButton && !finalButton.hasChildNodes()) {
        window.google.accounts.id.renderButton(finalButton, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 300
        });
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    
    if (existingScript) {
      if (window.google) {
        initializeGoogleSignIn();
      } else {
        existingScript.addEventListener('load', initializeGoogleSignIn);
      }
      return;
    }

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('✅ Google Sign-In script loaded');
      initializeGoogleSignIn();
    };

    script.onerror = () => {
      console.error('❌ Failed to load Google Sign-In script');
    };

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      const userObject = parseJwt(response.credential);
      console.log('✅ User object parsed:', userObject);
      
      // Save to localStorage first
      localStorage.setItem('user', JSON.stringify(userObject));
      console.log('✅ User saved to localStorage');
      
      // Verify it was saved
      const savedUser = localStorage.getItem('user');
      console.log('✅ Verification - User in localStorage:', savedUser);
      
      // Update state
      setUser(userObject);
      
      // Redirect to dashboard with a slight delay to ensure localStorage is synced
      setTimeout(() => {
        console.log('🚀 Redirecting to dashboard...');
        window.location.href = '/dashboard';
      }, 300);
    } catch (error) {
      console.error('❌ Error handling credential response:', error);
      alert('Sign-in failed. Please try again.');
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('❌ Error parsing JWT:', error);
      throw error;
    }
  };

  const handleSignIn = () => {
    // Trigger Google Sign-In prompt
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.prompt();
        console.log('✅ Google Sign-In prompt triggered');
      } catch (error) {
        console.error('❌ Error triggering Google Sign-In:', error);
        // Fallback to mock sign-in for testing
        handleMockSignIn();
      }
    } else {
      console.error('❌ Google Sign-In not initialized yet');
      handleMockSignIn();
    }
  };

  // Mock sign-in for testing (remove in production)
  const handleMockSignIn = () => {
    const mockUser = {
      name: 'Demo User',
      email: 'demo@weatherflow.com',
      picture: 'https://ui-avatars.com/api/?name=Demo+User&background=3b82f6&color=fff',
      sub: 'mock_user_id_123'
    };
    
    console.log('✅ Using mock sign-in for testing');
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Update state
    setUser(mockUser);
    
    // Redirect
    setTimeout(() => {
      console.log('🚀 Redirecting to dashboard with mock user...');
      window.location.href = '/dashboard';
    }, 500);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
      window.google.accounts.id.revoke(localStorage.getItem('user_email'));
    }
    console.log('✅ User signed out successfully');
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const features = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Real-Time Weather",
      description: "Live updates every 60 seconds with precision accuracy",
      color: "from-blue-500 to-cyan-400",
      stat: "60s",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      delay: "0"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "7-day detailed forecasts with AI predictions",
      color: "from-purple-500 to-pink-400",
      stat: "7 Days",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      delay: "100"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Multi-City Tracking",
      description: "Monitor unlimited locations simultaneously",
      color: "from-orange-500 to-red-400",
      stat: "∞",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      delay: "200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance with smart caching",
      color: "from-green-500 to-emerald-400",
      stat: "<1s",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      delay: "300"
    }
  ];

  const weatherCards = [
    { 
      city: "New York", 
      temp: "72", 
      unit: "°F",
      condition: "Sunny", 
      icon: <Sun className="w-12 h-12" />,
      humidity: "65%",
      wind: "12 mph",
      gradient: "from-yellow-400 to-orange-500",
      bg: "from-yellow-500/10 to-orange-500/10"
    },
    { 
      city: "London", 
      temp: "18", 
      unit: "°C",
      condition: "Cloudy", 
      icon: <Cloud className="w-12 h-12" />,
      humidity: "78%",
      wind: "8 mph",
      gradient: "from-gray-400 to-slate-500",
      bg: "from-gray-500/10 to-slate-500/10"
    },
    { 
      city: "Tokyo", 
      temp: "25", 
      unit: "°C",
      condition: "Rainy", 
      icon: <CloudRain className="w-12 h-12" />,
      humidity: "85%",
      wind: "15 mph",
      gradient: "from-blue-400 to-indigo-500",
      bg: "from-blue-500/10 to-indigo-500/10"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: <Activity className="w-6 h-6" /> },
    { label: "Cities Tracked", value: "1000+", icon: <MapPin className="w-6 h-6" /> },
    { label: "Daily Forecasts", value: "100M+", icon: <Cloud className="w-6 h-6" /> },
    { label: "Accuracy Rate", value: "99.9%", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse" />
        
        {/* Dynamic Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(37,99,235,0.6) 40%, transparent 70%)',
            top: '5%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            transition: 'transform 0.3s ease-out',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,1) 0%, rgba(126,34,206,0.6) 40%, transparent 70%)',
            top: '40%',
            right: '5%',
            transform: `translate(${-mousePosition.x * 0.04}px, ${-mousePosition.y * 0.04}px)`,
            transition: 'transform 0.3s ease-out',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Floating CSS Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(5deg); }
          66% { transform: translateY(30px) rotate(-5deg); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out forwards; }
      `}</style>

      {/* Enhanced Navigation */}
      <nav 
        className={`relative z-50 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Sun className="w-8 h-8 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  WeatherFlow
                </h1>
                <p className="text-xs text-gray-400">Real-time Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slideInRight">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-blue-400 shadow-lg hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-bold text-white hidden md:inline">{user.name}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div id="googleSignInButtonNav"></div>
              )}
              
              <button 
                onClick={user ? handleGoToDashboard : handleSignIn}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {user ? 'Dashboard' : 'Launch App'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className={`text-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6 animate-slideInUp">
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-xl hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Real-Time Weather Intelligence Platform
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span 
              className="inline-block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01 - 2}deg) rotateY(${mousePosition.x * 0.01 - 2}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              Weather
            </span>
            <br />
            <span className="inline-block text-white bg-clip-text animate-slideInRight">
              Intelligence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideInUp">
            Experience real-time forecasts with <span className="text-cyan-400 font-semibold">stunning visualizations</span> and <span className="text-purple-400 font-semibold">advanced analytics</span>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 animate-scaleIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-cyan-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Auth Section in Hero */}
          <div className="flex flex-col items-center gap-6 mb-20">
            {!user ? (
              <>
                <p className="text-lg text-gray-400 mb-4 animate-slideInUp">
                  Sign in with Google to access your personalized dashboard
                </p>
                <div id="googleSignInButtonHero" className="flex justify-center animate-scaleIn"></div>
              </>
            ) : (
              <div className="text-center animate-slideInUp">
                <p className="text-lg text-gray-400 mb-4">Welcome back, {user.name}!</p>
                <button 
                  onClick={handleGoToDashboard}
                  className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Go to Dashboard
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            )}
          </div>

          {/* Additional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={user ? handleGoToDashboard : handleSignIn}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 animate-slideInLeft"
            >
              <span className="relative z-10 flex items-center gap-3">
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button 
              className="group px-10 py-5 bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-white/20 font-bold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40 animate-slideInRight"
            >
              <span className="flex items-center gap-3">
                <Eye className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </span>
            </button>
          </div>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {weatherCards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              className={`group relative cursor-pointer transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${idx * 150}ms`,
                transform: activeCard === idx ? 'scale(1.05) translateY(-10px)' : ''
              }}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${card.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse`}></div>
              
              <div 
                className={`relative p-8 bg-gradient-to-br ${card.bg} backdrop-blur-2xl rounded-3xl border border-white/10 transform transition-all duration-500 hover:border-white/30`}
                style={{
                  transform: `perspective(1000px) rotateX(${activeCard === idx ? mousePosition.y * 0.02 - 5 : 0}deg) rotateY(${activeCard === idx ? mousePosition.x * 0.02 - 5 : 0}deg)`,
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-gray-300 font-medium">{card.city}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                        {card.temp}
                      </span>
                      <span className="text-3xl text-gray-400">{card.unit}</span>
                    </div>
                  </div>
                  <div className={`p-4 bg-gradient-to-br ${card.gradient} rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                    {card.icon}
                  </div>
                </div>

                <div className="text-xl text-gray-300 mb-6 font-semibold group-hover:text-white transition-colors">{card.condition}</div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Humidity</span>
                    </div>
                    <span className="text-lg font-bold">{card.humidity}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-400">Wind</span>
                    </div>
                    <span className="text-lg font-bold">{card.wind}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent animate-slideInUp">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl animate-slideInUp" style={{ animationDelay: '100ms' }}>
            Everything you need for weather intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative animate-scaleIn"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              
              <div className={`relative h-full p-8 ${feature.gradient} backdrop-blur-2xl rounded-3xl border border-white/10 transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2`}>
                <div className={`mb-6 bg-gradient-to-r ${feature.color} p-5 rounded-2xl inline-block transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                  {feature.icon}
                </div>
                <div className="text-4xl font-black mb-3 text-white group-hover:scale-110 transition-transform duration-300">{feature.stat}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-90 transition-all duration-700 animate-pulse"></div>
          
          <div className="relative p-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/20 transform transition-all duration-500 group-hover:scale-105 hover:border-white/40">
            <div className="text-center">
              <div className="inline-block mb-6">
                <Sparkles className="w-16 h-16 text-cyan-400 animate-pulse mx-auto" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Ready to Experience the Future?
              </h2>
              <p className="text-gray-300 mb-12 text-xl md:text-2xl max-w-2xl mx-auto">
                Join <span className="text-cyan-400 font-bold">50,000+</span> users who trust WeatherFlow for accurate forecasts
              </p>
              
              {user ? (
                <button 
                  onClick={handleGoToDashboard}
                  className="group/btn relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl font-bold text-2xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    Go to Dashboard
                    <ArrowRight className="w-8 h-8 group-hover/btn:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </button>
              ) : (
                <div className="flex justify-center">
                  <div id="googleSignInButtonFinal"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-12 border-t border-white/10 backdrop-blur-xl">
        <p className="text-gray-400 hover:text-gray-300 transition-colors">
          © 2024 WeatherFlow. Real-time weather intelligence platform.
        </p>
      </div>
    </div>
  );
};

export default HomePage;