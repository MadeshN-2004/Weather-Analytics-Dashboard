import React from 'react';

const StatCard = ({ icon, label, value }) => (
  <div className="group relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-2 border-blue-400/20 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Glowing orb effect */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
    
    {/* Animated corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Icon Container with Premium Effects */}
    <div className="relative mb-4">
      {/* Outer glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150"></div>
      
      {/* Icon background with gradient */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
        
        {/* Icon */}
        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      </div>
      
      {/* Floating sparkles */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
    </div>
    
    {/* Label with shimmer effect */}
    <div className="relative text-sm font-bold text-blue-300/80 uppercase tracking-wider mb-2 group-hover:text-blue-300 transition-colors duration-300">
      {label}
      {/* Underline animation */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500"></div>
    </div>
    
    {/* Value with gradient text */}
    <div className="relative text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
      {value}
    </div>
    
    {/* Pulse indicator */}
    <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
    
    {/* Bottom gradient line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>

    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }

      .group:hover {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default StatCard;