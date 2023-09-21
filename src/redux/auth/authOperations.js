import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from 'react-toastify';

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk('auth/register', 
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/signup', credentials);
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);

            
        }
    } 
);