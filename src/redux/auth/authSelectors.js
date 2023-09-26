export const selectToken = state => state.auth.token;

export const selectName = state => state.auth.user.name;

export const selectUser = state => state.auth.user;

export const selectId = state => state.auth.user._id;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;