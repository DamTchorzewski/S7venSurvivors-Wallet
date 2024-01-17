import useTransactions from '../../hook/useTransactions';
import styles from './Balance.module.css';

const BalanceComponent = () => {
  const { balance } = useTransactions();

  const formatBalance = data => {
    const formattedValue = parseFloat(data).toFixed(2);
    return formattedValue;
  };

  return (
    <div className={styles.balance}>
      <div className={styles.balance__text}>Your balance</div>
      <div className={styles.balance__amount}>
        <p>
          {isNaN(formatBalance(balance))
            ? 'Loading...'
            : `PLN ${formatBalance(balance)}`}
        </p>
      </div>
    </div>
  );
};

export default BalanceComponent;
