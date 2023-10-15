import styles from "../CancelButton/CancelButton.module.css"
export const CancelButton = ({name, onClick}) => {

    return (
        <button type="submit" onClick={onClick} className={styles.modalButtonCancel}>{name}</button>
    )
}