import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherData, fetchForecastData, searchCities } from '../thunks/weatherThunks';

const initialState = {
  cities: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  selectedCity: null,
  searchResults: [],
  cache: {},
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const cityName = action.payload;
      if (state.favorites.includes(cityName)) {
        state.favorites = state.favorites.filter(f => f !== cityName);
      } else {
        state.favorites.push(cityName);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(c => c.name !== action.payload);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    updateCache: (state, action) => {
      const { key, data } = action.payload;
      state.cache[key] = {
        data,
        timestamp: Date.now(),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { weather, forecast } = action.payload;
        const existingIndex = state.cities.findIndex(c => c.name === weather.name);
        
        const cityData = {
          name: weather.name,
          weather,
          forecast,
          lastUpdated: Date.now(),
        };

        if (existingIndex >= 0) {
          state.cities[existingIndex] = cityData;
        } else {
          state.cities.push(cityData);
        }
        
        state.isLoading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const { toggleFavorite, setSelectedCity, removeCity, clearSearchResults, updateCache } = weatherSlice.actions;
export default weatherSlice.reducer;