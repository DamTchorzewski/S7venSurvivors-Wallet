import { useSelector } from 'react-redux';
import './balance.scss';

function Balance() {
  const { balance } = useSelector(state => state.user);
  return (
    <div className="balance_container">
      <p className="balance_title">Your Balance</p>
      <p className="balance_result">{balance.toFixed(2)} €</p>
    </div>
  );
}

export default Balance;
