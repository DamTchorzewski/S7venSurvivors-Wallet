import styles from "./DeleteButton.module.css";

export const DeleteButton = ({ name, onClick }) => {
  return (
    <button type="submit" onClick={onClick} className={styles.buttonDelete}>
      {name}
    </button>
  );
};
