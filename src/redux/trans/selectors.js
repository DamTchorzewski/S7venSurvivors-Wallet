export const selectTransactions = state => state.transactions.items;

export const selectCategory = state => state.transactions.category;

export const selectTransactionsError = state => state.transactions.error;

export const selectIsTransactionsLoading = state => state.transactions.isLoading;
