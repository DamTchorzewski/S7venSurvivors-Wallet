import styles from "../SubmitButton/SubmitButton.module.css"
export const SubmitButton = ({name, onClick}) => {

    return (
        <button type="submit" onClick={onClick}  className={styles.modalButtonSubmit}>{name}</button>
    )
}