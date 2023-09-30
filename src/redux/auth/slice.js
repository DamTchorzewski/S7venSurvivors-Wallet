import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./actions";

const initialState = {
  user: { username: null, email: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isLoading: false,
  isPending: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isPending = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { username: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/pending'),
        state => {
          state.isPending = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/fulfilled'),
        state => {
          state.error = null;
          state.isPending = false;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.isPending = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
