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