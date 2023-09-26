import { ButtonAddTransactions } from './ButtonAddTransactions/buttonAddTransactions';

export const App = () => {
  return (
    <div
      style={{
        height: '1000px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <h1>TEST</h1>
      <ButtonAddTransactions />
    </div>
  );
};
