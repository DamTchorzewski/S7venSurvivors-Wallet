import { register, fetchCurrentUser } from './authOperations';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
    user: { email: '', name: '' },
    token: null,
    isLoading: false,
    isAuth: false,
    isFetchingCurrentUser: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => builder
    .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
        state.isFetchingCurrentUser = false;
        state.isAuth = true;
    })
    .addCase(fetchCurrentUser.rejected, state => {
        state.isFetchingCurrentUser = false;
        state.token = null;
    })

    .addMatcher(
        isAnyOf(
            register.fulfilled
        ),
            (state, { payload: { user, token } }) => {
            state.isLoading = false;
            state.user = user;
            state.token = token;
            state.error = null;
        }
    )

    .addMatcher(
        isAnyOf(
            register.pending,
            fetchCurrentUser.pending
        ),
            state => {
            state.isLoading = true;
        }
    )

    .addMatcher(
        isAnyOf(
            register.rejected
        ),
        (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    ),
});

export default authSlice.reducer;