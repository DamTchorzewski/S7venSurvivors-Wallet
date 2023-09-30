import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './actions';

const initialState = {
  user: { username: null, email: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isLoading: false,
  isRegistered: false,
  isRefreshing: false,
  isLogoutModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogoutModal: state => {
      state.isLogoutModalOpen = !state.isLogoutModalOpen;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRegistered = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRegistered = false;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { username: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLogoutModalOpen = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/fulfilled'),
        state => {
          state.error = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') &&
          action.type.endsWith('/rejected') &&
          !action.type.startsWith('auth/refreshUser'),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
export const { toggleLogoutModal } = authSlice.actions;
