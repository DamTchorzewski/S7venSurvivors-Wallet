import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import ButtonMain from '../ButtonMain';
import ButtonSecondary from '../ButtonSecondary';
import { login } from '../../redux/auth/actions';
import css from '../LoginRegisterForms/LoginRegister.module.css';
import { Link } from 'react-router-dom';
import Notiflix from 'notiflix';
import Svg from '../../utils/Svg/Svg';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleChange = ev => {
    ev.preventDefault();
    const { name, value } = ev.currentTarget;
    setInputs(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();

    if (
      !email.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
      )
    ) {
      return Notiflix.Notify.failure('Enter valid e-mail');
    }
    if (password.length < 6 || password.length > 12) {
      return Notiflix.Notify.failure(
        'Password must be between 6-12 characters'
      );
    }

    dispatch(login(inputs));
    setInputs({ email: '', password: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.loginInputs}>
        <Input
          text={
            <div className={css.label}>
              <Svg className={css.icon} icon="email" fill="#e0e0e0" size="24" />
              <span>E-mail</span>
            </div>
          }
          name='email'
          type='email'
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <Input
          text={
            <div className={css.label}>
              <Svg
                className={css.icon}
                icon='password'
                fill='#e0e0e0'
                size='24'
              />
              <span>Password</span>
            </div>
          }
          name='password'
          type='password'
          value={inputs.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className={css.buttons}>
        <ButtonMain text="LOG IN" type="submit" />
        <Link to="/S7venSurvivors-Wallet/register">
          <ButtonSecondary text="REGISTER" />
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
