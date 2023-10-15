import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectBalance,
  selectTransactionsError,
  selectIsTransactionsLoading,
} from '../../redux/trans/selectors';

const useTransactions = () => {
  const transactions = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);
  const transactionsError = useSelector(selectTransactionsError);
  const isTransactionsLoading = useSelector(selectIsTransactionsLoading);

  return {
    transactions,
    balance,
    transactionsError,
    isTransactionsLoading,
  };
};

export default useTransactions;
