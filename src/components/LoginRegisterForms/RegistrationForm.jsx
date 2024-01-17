import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import useAuth from '../../hook/useAuth';
import css from '../LoginRegisterForms/LoginRegister.module.css';
import Input from '../Input';
import ButtonMain from '../ButtonMain';
import ButtonSecondary from '../ButtonSecondary';
import ResendButton from './ResendButton';
import { Link } from 'react-router-dom';
import { register } from '../../redux/auth/actions';
import Notiflix from 'notiflix';
import Svg from '../../utils/Svg/Svg';

const RegistrationForm = () => {
  const { user, isRegistered } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmRegister, setConfirmRegister] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [confirmFail, setConfirmFail] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirm: '',
    name: '',
  });
  const dispatch = useDispatch();

  const resend = async () => {
    try {
      setIsLoading(true);
      await axios.post('https://wallet-app-api.cyclic.cloud/api/users/reverify', {
        email: user.email,
      });
      Notiflix.Notify.success('Verification email has been resend');
    } catch {
      Notiflix.Notify.failure('Sorry, the email could not be resend');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isRegistered && confirmRegister) {
      setConfirmPass(false);
      Notiflix.Notify.success(
        'Registration successful, please check your e-mail for confirmation',
        { timeout: 5000 }
      );
    }

    if (!isRegistered && confirmRegister) {
      setConfirmPass(false);
    }
  }, [isRegistered, confirmRegister]);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setInputs(data => ({ ...data, [name]: value }));
  };

  const handleConfirm = e => {
    e.preventDefault();
    handleChange(e);
    const form = e.target.closest('form');
    const password = form.elements.password.value;
    const confirm = form.elements.confirm.value;

    if (confirm !== password) {
      setConfirmPass(false);
      setConfirmFail(true);
    }
    if (confirm === password) {
      setConfirmPass(true);
      setConfirmFail(false);
    }
    if (confirm === '' && password === '') {
      setConfirmFail(false);
      setConfirmPass(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();
    const confirm = form.elements.confirm.value.trim();
    const name = form.elements.name.value.trim();

    if (!email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
      return Notiflix.Notify.failure('Enter valid e-mail');
    }
    if (password.length < 6 || password.length > 12) {
      return Notiflix.Notify.failure(
        'Password must be between 6-12 characters'
      );
    }
    if (confirm !== password) {
      setConfirmPass(false);
      return Notiflix.Notify.failure('Passwords need to match');
    } else if (confirm === password) {
      setConfirmPass(true);
    }
    if (name.length < 1 || name.length > 12) {
      return Notiflix.Notify.failure('Name must be between 1-12 characters');
    }

    dispatch(
      register({
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
    );

    setConfirmRegister(true);

    setInputs({
      email: '',
      password: '',
      confirm: '',
      name: '',
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.registerInputs}>
        <Input
          text={
            <div className={css.label}>
              <Svg className={css.icon} icon="email" fill="#e0e0e0" size="24" />
              <span>E-mail</span>
            </div>
          }
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <Input
          text={
            <div className={css.label}>
              <Svg
                className={css.icon}
                icon="password"
                fill="#e0e0e0"
                size="24"
              />
              <span>Password</span>
            </div>
          }
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleConfirm}
          required
        />
        <Input
          text={
            <div className={css.label}>
              <Svg
                className={css.icon}
                icon="password"
                fill="#e0e0e0"
                size="24"
              />
              <span>Confirm Password</span>
            </div>
          }
          name="confirm"
          type="password"
          value={inputs.confirm}
          onChange={handleConfirm}
          required
        />
        {confirmPass ? <div className={css.confirmPass}></div> : null}
        {confirmFail ? <div className={css.confirmFail}></div> : null}
        <Input
          text={
            <div className={css.label}>
              <Svg className={css.icon} icon="name" fill="#e0e0e0" size="24" />
              <span>First Name</span>
            </div>
          }
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={css.buttons}>
        <ButtonMain text="REGISTER" type="submit" />
        <Link to="/S7venSurvivors-Wallet/">
          <ButtonSecondary text="LOG IN" />
        </Link>
        {isRegistered && (
          <ResendButton
            className={css.resendButton}
            text={isLoading ? 'Loading...' : 'Resend verification E-mail'}
            onClick={resend}
          ></ResendButton>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
