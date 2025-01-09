// src/store/hackathonsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const hackathonsSlice = createSlice({
  name: 'hackathons',
  initialState: [],
  reducers: {
    setHackathons: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHackathons } = hackathonsSlice.actions;
export default hackathonsSlice.reducer;
