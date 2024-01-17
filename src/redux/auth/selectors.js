export const selectUser = state => state.auth.user;

export const selectAuthError = state => state.auth.error;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsAuthLoading = state => state.auth.isLoading;

export const selectIsRegistered = state => state.auth.isRegistered;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsLogoutModalOpen = state => state.auth.isLogoutModalOpen;