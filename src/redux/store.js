// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/user';
import hackathonsSlice from './slice/hackathonsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    hackathons: hackathonsSlice,
  },
});
