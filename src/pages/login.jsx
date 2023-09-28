// import React from 'react';
import Media from 'react-media';
//import { LoginForm } from "../components/LoginForm/LoginForm";
import s from './pages.module.css'
import frame from '../assets/desktop-login/image-center.png';
import frame2x from '../assets/desktop-login/image-center@2x.png';

const Login = () => {
    return (
        <div className={s.commonContainer}>
            <Media
                query="(min-width: 767px)"
                render={() => (
                    <div className={s.logoContainer}>
                    <img 
                        className={s.regImage} 
                        srcSet={`${frame} 1x, ${frame2x} 2x`}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        src={frame} 
                        alt="" 
                    />
                    <h1 className={s.title}>Finance App</h1>
                    </div>
                )}
            />
            <div className={s.formContainer}>

            </div>
        </div>
    );
};

export default Login;
