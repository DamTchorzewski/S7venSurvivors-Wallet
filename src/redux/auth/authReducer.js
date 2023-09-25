import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
    registerRequest,
    registerSuccess,
    registerError,
} from './authActions';


const user = createReducer(
    { name: null, email: null },
    {
        [registerSuccess]: (_, { payload }) => payload,
        // [loginSuccess]: (_, { payload }) => payload,
        // [logoutSuccess]: () => ({ name: null, email: null }),
    },
);

const token = createReducer(null, {
    [registerSuccess]: (_, { payload }) => payload.token,
    // [loginSuccess]: (_, { payload }) => payload.token,
    // [logoutSuccess]: () => null,
    // [getUserByGoogleAuthSuccess]: (_, { payload }) => payload.token,
});

const isRegistered = createReducer(false, {
    [registerSuccess]: () => true,
});

const error = createReducer(null, {
    [registerRequest]: () => null,
    [registerError]: (_, { payload }) => payload,
});

export default combineReducers({
    user,
    token,
    isRegistered,
    error,
});