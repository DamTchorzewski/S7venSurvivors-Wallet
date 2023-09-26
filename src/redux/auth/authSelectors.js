export const selectToken = state => state.auth.token;
export const selectUsername = state => state.auth.user.name;
export const selectId = state => state.auth.user._id;

export const selectCurrentUser = state =>
    state.auth.fetchCurrentUser;

export const selectIsAuth = state => state.auth.isAuth;