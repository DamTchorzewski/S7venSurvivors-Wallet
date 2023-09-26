import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { refreshUser, register } from "./authOperations";

const initialState = {
    user: { email: '', name: '' },
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder =>
        builder
        // .addCase(logout.fulfilled, state => {
        //   state.isLoading = false;
        //   state.error = null;
        //   state.token = null;
        //   state.user = { name: '', email: '' };
        //   state.isAuth = false;
        // })
        // .addCase(logout.rejected, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = payload;
        // })

        .addCase(refreshUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload;
            state.isRefreshing = false;
            state.isAuth = true;
        })

        .addCase(refreshUser.rejected, state => {
            state.isRefreshing = false;
            state.token = null;
        })

        // .addCase(login.fulfilled, state => {
        //     state.isAuth = true;
        // })

        .addMatcher(
            isAnyOf(register.fulfilled),
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
                refreshUser.pending
            ),
            state => {
                state.isLoading = true;
            }
        )

        .addMatcher(
            isAnyOf(register.rejected),
            (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            }
        ),
    }
);

export default authSlice.reducer;