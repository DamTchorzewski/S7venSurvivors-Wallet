import React, {useState} from 'react';
import styles from '../SelectMenu/SelectMenu.module.css';
import { nanoid } from "nanoid";

export const SelectMenu = ({ placeholder, onClick }) => {

    const categories = [
        {'category': 'Main expenses'},
        {'category': 'Products'},
        {'category': 'Car'},
        {'category': 'Self care'},
        {'category': 'Child care'},
        {'category': 'Household products'},
        {'category': 'Education'},
        {'category': 'Leisure'},
        {'category': 'Entertainment'},
        {'category': 'Other expenses'}]

    const data = categories

    const [modal, setModal] = useState(false)
    const [name, setName] = useState(`${placeholder}`)

    const toogleModal = () => {
        setModal(!modal)
    }
    const changeName = (e) => {
        const newName = e.innerText
        setName(newName)
        setModal(!modal)
        onClick(newName)
        return newName
    }
   

    return (
        <>
        <div className={styles.wrapper}>
            <div onClick={toogleModal} className={styles.selectBtn}>
                <span>{name}</span>
            </div>
        {modal&&
            <div className={styles.optionsContainer}>
                <ul className={styles.options}>
                    {data.map(({category})=>{
                        return(
                        <li key={nanoid()} 
                        onClick={(e)=>changeName(e.target)} 
                        className={styles.option}>
                            <span>
                                {category}
                            </span></li>)})}
                </ul>
            </div>
        }
        </div>
        {modal&&<div className={styles.backdrop} onClick={toogleModal}>a</div>}
        </>
    )
}

