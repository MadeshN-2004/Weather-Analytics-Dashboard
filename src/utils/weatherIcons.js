import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudDrizzle, CloudLightning } from 'lucide-react';

export const getWeatherIcon = (condition) => {  // ← Named export
  const icons = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Drizzle: CloudDrizzle,
    Snow: CloudSnow,
    Thunderstorm: CloudLightning,
    Mist: Cloud,
    Smoke: Cloud,
    Haze: Cloud,
    Dust: Wind,
    Fog: Cloud,
    Sand: Wind,
    Ash: Cloud,
    Squall: Wind,
    Tornado: Wind,
  };
  return icons[condition] || Cloud;
};

// No default export here!