import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: localStorage.getItem('temperatureUnit') || 'metric',
  showSettings: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('temperatureUnit', action.payload);
    },
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
  },
});

export const { setUnit, toggleSettings } = settingsSlice.actions;
export default settingsSlice.reducer;