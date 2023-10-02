import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Notiflix from 'notiflix';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { signup } from "../../redux/auth/actions";
import PasswordStrenghtMeter from './PasswordStrengthMeter';

import logo from '../../assets/svg/wallet.svg';
import emailIcon from '../../assets/svg/email.svg';
import passwordIcon from '../../assets/svg/password.svg';
import nameIcon from '../../assets/svg/nameForm.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import css from "./RegisterForm.module.css";

const validationsSchema = Yup.object({
    email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .max(12, 'Password should be of maximum 12 characters length')
        .required('Password is required!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords are not the same')
        .required('Password confirmation is required!'),
    username: Yup.string()
        .typeError()
        .min(1, 'Name should be of minimum 1 character length')
        .max(12, 'Name should be of maximum 12 characters length')
        .required('Name is required!'),
});

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
};

const RegisterForm = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async ({ email, password, username }) => {

        try {
            await dispatch(signup({ email, password, username }));
            Notiflix.Notify.Success('Registered successfully!');
            navigate('/S7venSurvivors-Wallet/');
        } catch (error) {
            Notiflix.Notify.Failure('Registration failed. Please try again later.'); 
        }
    };


    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={initialValues}
            validateOnBlur
            validationSchema={validationsSchema}
            onSubmit={handleSubmit}
            
        >
            {({ 
                handleChange,
                handleBlur,
                touched,
                isValid,
                dirty,
                values,
                errors, 
            }) => (
        <div className={css.form__container}>
        <Form className={css.form}>

            <div className={css.logo__container}>
                <img className={css.logo} alt="Logo" src={logo} />
                <h1 className={css.title}>Wallet</h1>
            </div>

            <div className={css.input__container}>
                {touched.email && errors.email ? (
                <p className={css.errors}>
                    {errors.email}
                </p>
                ) : null}

                <img className={css.icon__input} alt="email" src={emailIcon} />

                <input
                    className={css.input}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInput={e => setPassword(e.target.value)}
                />
            </div>

            <div className={css.input__container}>
                {touched.password && errors.password ? (
                <p className={css.errors}>
                    {errors.password}
                </p>
                ) : null}

                <img className={css.icon__input} alt="password" src={passwordIcon} />

                <input
                    className={css.input}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInput={e => setPassword(e.target.value)}
                />

            <span
                onClick={handlePasswordVisibility}
                className={css.password__visibility__toggle}
            >
            {showPassword ? (
                <VisibilityOffIcon style={{ color: '#e0e0e0' }} />
            ) : (
                <VisibilityIcon style={{ color: '#e0e0e0' }} />
            )}
            </span>
                <PasswordStrenghtMeter password={password} />
            </div>

            <div className={css.input__container}>
                {touched.confirmPassword && errors.confirmPassword ? (
                <p className={css.errors}>
                    {errors.confirmPassword}
                </p>
                ) : null}

               <img className={css.icon__input} alt="password again " src={passwordIcon} />

                <input
                    className={css.input}
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className={css.input__container}>
                {touched.username && errors.username ? (
                <p className={css.errors}>
                    {errors.username}
                </p>
                ) : null}

                  <img className={css.icon__input} alt="name " src={nameIcon} />
                
                            <input
                    className={css.input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="First name"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className={css.btn__cnt}>
                <button
                    type="submit"
                    className={css.main__btn}
                    disabled={!isValid && !dirty}
                >
                    Register
                </button>
                <Link to="/S7venSurvivors-Wallet/">
                    <button 
                        type="button" 
                        className={css.scd__btn}
                    >
                        Log in
                    </button>
                </Link>
            </div>

        </Form>
        </div>
    )}
    </Formik>
    );
}

export default RegisterForm;