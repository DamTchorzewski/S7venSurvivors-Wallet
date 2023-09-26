import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/users', credentials);
            toast.success('Registration is successful!');
            token.set(data.token);
            return data;
        } catch (error) {
            return rejectWithValue(toast.error('Email is already in use'));
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/refresh',
    async (_, { rejectWithValue, getState }) => {
        const tokenLS = getState().auth.token;
        if (!tokenLS) {
        return rejectWithValue('No token');
    }

    token.set(tokenLS);
    try {
        const { data } = await axios.get('/api/users/current');
        return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);