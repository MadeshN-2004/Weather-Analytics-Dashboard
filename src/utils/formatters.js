export const formatTemperature = (temp, unit) => {
  return `${Math.round(temp)}${unit === 'metric' ? '°C' : '°F'}`;
};

export const formatTime = (timestamp, format = 'short') => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'short') {
    return date.toLocaleTimeString('en-US', { hour: 'numeric' });
  }
  
  return date.toLocaleString('en-US');
};

export const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatSpeed = (speed, unit) => {
  return unit === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} mph`;
};

// NEW: Calculate dew point from temperature and humidity
export const calculateDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
};

// NEW: Get wind direction from degrees
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// NEW: Format date for display
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};