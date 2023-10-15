export const selectTransactions = state => state.transactions.items;

export const selectBalance = state => state.transactions.balance;

export const selectTransactionsError = state => state.transactions.error;

export const selectIsTransactionsLoading = state =>
  state.transactions.isLoading;
