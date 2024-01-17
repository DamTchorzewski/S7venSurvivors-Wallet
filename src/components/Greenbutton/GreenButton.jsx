import styles from "../Greenbutton/GreenButton.module.css"
export const GreenButton = ({name, onClick}) => {

    return (
        <button type="submit" onClick={onClick}  className={styles.modalButtonSubmit}>{name}</button>
    )
}