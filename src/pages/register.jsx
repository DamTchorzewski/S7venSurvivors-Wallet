import React, { useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import Loader from '../components/Loader/Loader';
import useAuth from '../utils/hooks/useAuth';
import Media from 'react-media';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import styles from './pages.module.css'
import frame from '../assets/desktop-registration/image-center.png';
import frame2x from '../assets/desktop-registration/image-center@2x.png';


const Register = () => {
    const { isAuthLoading } = useAuth();
    return (
        <>
        <div className={styles.common__container}>

            <Media
                query="(min-width: 767px)"
                render={() => (
                    <div className={styles.logo__container}>
                    <img 
                        className={styles.reg__image} 
                        srcSet={`${frame} 1x, ${frame2x} 2x`}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        src={frame} 
                        alt="" 
                    />
                    <h1 className={styles.title}>Finance App</h1>
                    </div>
                )}
            />
            <div className={styles.form__container}>
                <RegisterForm />
            </div>

            </div>
            <Loader isVisible={isAuthLoading} />
            </>
    )
};

export default Register;