import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectCategory,
  selectTransactionsError,
  selectIsTransactionsLoading,
} from '../../redux/trans/selectors';

const useTransactions = () => {
  const transactions = useSelector(selectTransactions);
  const category = useSelector(selectCategory);
  const transactionsError = useSelector(selectTransactionsError);
  const isTransactionsLoading = useSelector(selectIsTransactionsLoading);

  return {
    transactions,
    category,
    transactionsError,
    isTransactionsLoading,
  };
};

export default useTransactions;
