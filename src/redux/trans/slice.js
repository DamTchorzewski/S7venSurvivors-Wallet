import { createSlice } from '@reduxjs/toolkit';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  removeTransaction,
} from './actions';

const initialState = {
  items: [],
  balance: '',
  error: null,
  isLoading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const i = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        state.items.splice(i, 1, action.payload);
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        const i = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        state.items.splice(i, 1);
      })
      .addMatcher(
        action =>
          action.type.startsWith('transactions') &&
          action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('transactions') &&
          action.type.endsWith('/fulfilled'),
        state => {
          state.error = null;
          state.isLoading = false;

          const income = state.items
            .filter(({ type }) => type === '+')
            .map(({ sum }) => Number(sum))
            .reduce((acc, n) => acc + n, 0);

          const expense = state.items
            .filter(({ type }) => type === '-')
            .map(({ sum }) => Number(sum))
            .reduce((acc, n) => acc + n, 0);

          const balance = income - expense;
          state.balance = String(balance);
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('transactions') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const transactionsReducer = transactionsSlice.reducer;
