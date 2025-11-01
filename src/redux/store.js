import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['weather/addCity/fulfilled'],
        ignoredPaths: ['weather.cache'],
      },
    }),
});