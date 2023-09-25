const getIsLoggedIn = state => state.auth.isLoggedIn;

const getLoading = state => state.auth.isLoading;

const getIsRegistered = state => state.auth.isRegistered;

const authSelectors = {
    getIsLoggedIn,
    getLoading,
    getIsRegistered,
};
export default authSelectors;