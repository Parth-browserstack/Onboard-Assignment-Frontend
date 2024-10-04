import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

// User login
export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await axios.post('https://fake-ecommerce-app-api.onrender.com/auth/login', credentials);
  return response.data; // Assuming the API returns user info
});

// User logout
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await axios.post('https://fake-ecommerce-app-api.onrender.com/logout');
  return null; // Return null to clear user info
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Save user data to state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Clear user data on logout
      });
  },
});

export default userSlice.reducer;
