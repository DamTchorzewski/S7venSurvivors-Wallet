export const selectUser = state => state.auth.user;

export const selectError = state => state.auth.error;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsAuthLoading = state => state.auth.isLoading;

export const selectIsPending = state => state.auth.selectIsPending;

export const selectIsRefreshing = state => state.auth.isRefreshing;
