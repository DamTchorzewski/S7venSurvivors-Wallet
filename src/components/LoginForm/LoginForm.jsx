import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { login } from '../../redux/auth/actions';

import logo from '../../assets/svg/wallet.svg';
import IconEmail from '@mui/icons-material/Email';
import IconLock from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import s from "./LoginForm.module.css";

const validationsSchema = Yup.object({
    email: Yup.string()
        .email('Enter the valid email')
        .required('The email field is required'),
    password: Yup.string().required('The password field is required'),
});

const initialValues = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = ({ email, password }) => {
        dispatch(login({ email, password }));
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
        <div className={s.form__container}>
        <Form className={s.form}>

            <div className={s.logo__container}>
                <img className={s.logo} alt="Logo" src={logo} />
                <h1 className={s.title}>Wallet</h1>
            </div>

            <div className={s.input__container}>
                {touched.email && errors.email ? (
                <p className={s.errors}>
                    {errors.email}
                </p>
                ) : null}

                <IconEmail
                    className={s.input__icon}
                    style={{ color: '#e0e0e0' }}
                />

                <input
                    className={s.input}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className={s.input__container}>
                {touched.password && errors.password ? (
                <p className={s.errors}>
                    {errors.password}
                </p>
                ) : null}

                <IconLock
                    className={s.input__icon}
                    style={{ color: '#e0e0e0' }}
                />

                <input
                    className={s.input}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <span
                    onClick={handlePasswordVisibility}
                    className={s.password__visibility__toggle}
                >
                    {showPassword ? (
                    <VisibilityOffIcon style={{ color: '#e0e0e0' }} />
                    ) : (
                    <VisibilityIcon style={{ color: '#e0e0e0' }} />
                    )}
                </span>
            </div>

            <div className={s.btn__cnt}>
                <button 
                    type="submit" 
                    className={s.main__btn}
                >
                    Log in
                </button>
                <Link to="/S7venSurvivors-Wallet/register">
                    <button
                        type="button"
                        className={s.scd__btn}
                        disabled={!isValid && !dirty}
                    >
                    Register
                    </button>
                </Link>
                </div>
            </Form>
            </div>
            )}
        </Formik>
    )
}

export default LoginForm;