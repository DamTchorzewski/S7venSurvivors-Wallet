import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { login } from '../../redux/auth/actions';

import logo from '../../assets/svg/wallet.svg';
import emailIcon from '../../assets/svg/email.svg';
import passwordIcon from '../../assets/svg/password.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import styles from "./LoginForm.module.css";

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
        <div className={styles.form__container}>
        <Form className={styles.form}>

            <div className={styles.logo__container}>
                <img className={styles.logo} alt="Logo" src={logo} />
                <h1 className={styles.title}>Wallet</h1>
            </div>

            <div className={styles.input__container}>
                {touched.email && errors.email ? (
                <p className={styles.errors}>
                    {errors.email}
                </p>
                ) : null}

                <img className={styles.icon__input} alt="email" src={emailIcon} />

                <input
                    className={styles.login__input}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className={styles.input__container}>
                {touched.password && errors.password ? (
                <p className={styles.errors}>
                    {errors.password}
                </p>
                ) : null}

                 <img className={styles.icon__input} alt="poassword" src={passwordIcon} />

                <input
                    className={styles.login__input}
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
                    className={styles.password__visibility__toggle}
                >
                    {showPassword ? (
                    <VisibilityOffIcon style={{ color: '#e0e0e0' }} />
                    ) : (
                    <VisibilityIcon style={{ color: '#e0e0e0' }} />
                    )}
                </span>
            </div>

            <div className={styles.btn__cnt}>
                <button 
                    type="submit" 
                    className={styles.main__btn}
                >
                    Log in
                </button>
                <Link to="/S7venSurvivors-Wallet/register">
                    <button
                        type="button"
                        className={styles.scd__btn}
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