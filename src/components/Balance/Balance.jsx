import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

function Balance() {
  const { consumption } = useSelector(state => state.user);
  return (
    <div className={styles.balance_container}>
      <p className={styles.balance_title}>Your Balance</p>
      <p className={styles.balance_result}>{consumption.toFixed(2)} €</p>
    </div>
  );
}

export default Balance;
