import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`/transactions`);

      return res.data.result;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue('Error getting transactions');
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (body, thunkAPI) => {
    try {
      const res = await axios.post('/transactions', body);
      return res.data.result;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue('Error creating transaction');
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, body }, thunkAPI) => {
    try {
      const res = await axios.put(`/transactions/${id}`, body);
      return res.data.result;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue('Error updating transaction');
    }
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/removeTransaction',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/transactions/${id}`);
      return res.data.result;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue('Error updating transaction');
    }
  }
);
