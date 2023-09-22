import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { register } from "../../../redux/auth/authOperations";
import { Formik, Field, ErrorMessage } from 'formik';
import { PasswordStrenghtMeter } from './PasswordStrenghtMeter';
import * as Yup from 'yup';

import s from "./RegisterForm.module.css";

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [password, setPassword] = useState('');

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
        name: Yup.string()
        .typeError()
        .min(1, 'Name should be of minimum 1 character length')
        .max(12, 'Name should be of maximum 12 characters length')
        .required('Name is required!'),
    });

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    };

    const handleSubmit = ({ email, password, name }) => {
        // event.preventDefault();
        // const form = event.currentTarget;

        dispatch(
            register({
                email,
                password,
                name,
            }),
        );
        
        // form.reset();
        history.push('/login');
    };

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationsSchema}
            validateOnBlur={true}
        >
        <div>
            <ErrorMessage
                component="div"
                name="email"
                style={{ color: '#FF6596' }}
            />

            <label htmlFor="email" className={s.label}>
                <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={s.field}
                />
            </label>
        </div>

        <div>
            <ErrorMessage
                component="div"
                name="password"
                style={{ color: '#FF6596' }}
            />

            <label htmlFor="password" className={s.label}>
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={s.field}
                    onInput={
                        (event) => setPassword(event.target.value)
                    }
                />
            </label>
        </div>

        <div>
            <ErrorMessage
                component="div"
                name="confirmPassword"
                style={{ color: '#FF6596' }}
            />
            <label htmlFor="confirmPassword" className={s.Label}>

            <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={s.Field}
            />
            </label>
        </div>

        <PasswordStrenghtMeter password={password} />

        <div>
            <ErrorMessage
                component="div"
                name="name"
                style={{ color: '#FF6596' }}
            />
            <label htmlFor="name" className={s.Label}>

            <Field
                type="text"
                name="name"
                placeholder="Your name"
                className={s.Field}
            />
            </label>
        </div>

        {/* <Button
            type="submit"
            contentBtn="Sign up"
            button="Button"
            disabled={!isValid && !dirty}
            onClick={handleSubmit}
        /> */}

        {/* {isLoading && <Spinner />} */}

    </Formik>
    )
};