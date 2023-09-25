import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// const token = {
//     set(token) {
//         axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     },
//     unset() {
//         axios.defaults.headers.common.Authorization = '';
//     },
// };

export const register = createAsyncThunk('auth/register', async (credentials) => {
    try {
        const { data } = await axios.post('/api/users/signup', credentials);
        return data;
    } catch (error) {
    if (error.response) {
        if (error.response.status === 400) {
            toast.error('User creation error! Try signup again.');
        } else if (error.response.status === 409) {
            toast.error('User has already been created.');
        } else if (error.response.status === 500) {
            toast.error('Server error! Try signup again later.');
        } else {
            toast.error('Something went wrong! Try signup again.');
        }
    } else {
        toast.error('Network error! Try signup again later.');
    }
        throw error;
    }
});