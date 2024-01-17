import styles from '../LoginRegisterForms/LoginRegister.module.css';

const ResendButton = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.resendButton}>
      {text}
    </button>
  );
};

export default ResendButton;