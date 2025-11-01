import { createAsyncThunk } from '@reduxjs/toolkit';
import { weatherAPI } from '../../services/weatherAPI';
import { isCacheValid, getCachedData, setCachedData } from '../../services/cacheService';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ city, unit }, { rejectWithValue }) => {
    try {
      const cacheKeyWeather = `weather_${city}_${unit}`;
      const cacheKeyForecast = `forecast_${city}_${unit}`;
      
      let weather, forecast;

      if (isCacheValid(cacheKeyWeather)) {
        weather = getCachedData(cacheKeyWeather);
        forecast = getCachedData(cacheKeyForecast);
      } else {
        weather = await weatherAPI.getCurrentWeather(city, unit);
        forecast = await weatherAPI.getForecast(city, unit);
        
        setCachedData(cacheKeyWeather, weather);
        setCachedData(cacheKeyForecast, forecast);
      }

      return { weather, forecast };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }
);

export const searchCities = createAsyncThunk(
  'weather/searchCities',
  async (query, { rejectWithValue }) => {
    try {
      const results = await weatherAPI.searchCities(query);
      return results.list?.slice(0, 5) || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);