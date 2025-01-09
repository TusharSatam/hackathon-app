// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,  // Stores user info after login
    authToken: null, // Stores the auth token
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    logout: (state) => {
      state.userData = null;
      state.authToken = null;
    },
  },
});

export const { setUser, logout,setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
