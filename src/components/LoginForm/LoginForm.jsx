import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/actions';
import TextInput from '../TextInput/TextInput';

import './LoginForm.scss';

import logo from '../../assets/images/wallet-icon.png';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).max(12),
  email: Yup.string().email().required('Please enter email'),
  password: Yup.string()
    .test('password', 'password length check', value => {
      return value.length > 0;
    })
    .required('Please enter valid password')
    .matches(
      /^.*(?=.{8,12})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirmPassword: Yup.string()
    .test('confirmPassword', 'password length check', value => {
      return value.length > 0;
    })
    .required('Please confirm password')
    .oneOf([Yup.ref('password')], "Passwords don't match."),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      }),
    );
    form.reset();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {props => {
        const { values } = props;
        return (
          <div>
            <Form className="form-login" onSubmit={e => handleSubmit(e)}>
              <div className="logo">
                <img className="Logo" alt="Logo" src={logo} />
                <h1>Wallet</h1>
              </div>
              <div className="container_input">
                <TextInput
                  label={<EmailIcon width={20} height={16} />}
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="E-mail"
                  className="input"
                />
                <ErrorMessage name="email">
                  {msg => <p className="error_message">{msg}</p>}
                </ErrorMessage>
                <TextInput
                  label={<LockIcon width={16} height={21} />}
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  className="input"
                />
                <ErrorMessage name="password">
                  {msg => <p className="error_message--password">{msg}</p>}
                </ErrorMessage>
              </div>
              <div className="button_container">
                <button className="logo_btn" type="submit" text="Login"></button>
                <div>
                  <NavLink className="main_btn" to="/register">
                    Register
                  </NavLink>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
