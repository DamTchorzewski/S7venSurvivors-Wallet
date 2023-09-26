import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk('auth/register', 
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/signup', credentials);
            toast.success('Registration is successful!');
            token.set(data.token);
            return data;
        } catch (error) {
            return rejectWithValue(toast.error('Email is already in use'));
        }
    } 
);

export const refreshUser = createAsyncThunk('auth/refresh', 
    async (_, { rejectWithValue, getState }) => {
        const state = getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return rejectWithValue('Unable to fetch user');
        }

        try {
            token.set(persistedToken);
            const { data } = await axios.get('/users/me');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }    
);
