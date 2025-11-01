import axios from 'axios';

// Temporary hardcode for testing
const API_KEY = '40bb1f7a6f95273bfc21259bff168a68';
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// Original code (commented out for now):
// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const API_BASE = process.env.REACT_APP_WEATHER_API_BASE || 'https://api.openweathermap.org/data/2.5';

console.log('Weather API using key:', API_KEY); // Debug log

const weatherClient = axios.create({
  baseURL: API_BASE,
  params: {
    appid: API_KEY,
  },
});

export const weatherAPI = {
  getCurrentWeather: async (city, units = 'metric') => {
    const response = await weatherClient.get('/weather', {
      params: { q: city, units },
    });
    return response.data;
  },

  getForecast: async (city, units = 'metric') => {
    const response = await weatherClient.get('/forecast', {
      params: { q: city, units },
    });
    return response.data;
  },

  searchCities: async (query) => {
    const response = await weatherClient.get('/find', {
      params: { q: query, type: 'like' },
    });
    return response.data;
  },

  getWeatherByCoords: async (lat, lon, units = 'metric') => {
    const response = await weatherClient.get('/weather', {
      params: { lat, lon, units },
    });
    return response.data;
  },
};