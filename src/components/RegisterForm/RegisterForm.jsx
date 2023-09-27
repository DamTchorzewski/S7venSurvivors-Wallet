
import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/actions";
import useAuth from "../../utils/hooks/useAuth";
import useAuthPending from "../../utils/hooks/useAuthPending";
import usePasswordVisibility from "../../utils/hooks/usePasswordVisibility";
import useValidateInputs from "../../utils/hooks/useAuthPending";
import clsx from "clsx";
import scss from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const { isAuthPending } = useAuth();
  const { AuthPendingIcon } = useAuthPending();
  const { PasswordIcon, passwordRef, togglePasswordVisibility } =
    usePasswordVisibility();
  const { validateUsername, validateEmail, validatePassword } =
    useValidateInputs();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.elements.username;
    const email = form.elements.email;
    const password = form.elements.password;

    if (validateUsername(username.value)) {
      return username.focus();
    }

    if (validateEmail(email.value)) {
      return email.focus();
    }

    if (validatePassword(password.value)) {
      return password.focus();
    }

    dispatch(
      register({
        name: username.value,
        email: email.value,
        password: password.value,
      })
    );
  };

  return (
    <section className={scss.section}>
      <div>
        <h1 className={scss.formTitle}>Registration</h1>
        <form className={scss.registerForm} onSubmit={handleSubmit}>
          <label className={scss.label}>
            <span className={scss.fieldName}>Username</span>
            <input
              className={scss.input}
              type="text"
              name="username"
              title="Only letters and spaces are allowed"
              required
            />
          </label>
          <label className={scss.label}>
            <span className={scss.fieldName}>E-mail</span>
            <input
              className={scss.input}
              type="email"
              name="email"
              title="Enter a valid e-mail address"
              required
            />
          </label>
          <label className={scss.label}>
            <span className={scss.fieldName}>Password</span>
            <input
              className={clsx(scss.input, scss.passwordInput)}
              ref={passwordRef}
              type="password"
              name="password"
              title="Password must contain at least 8 characters, including one letter and one number"
              required
            />
            <button
              className={scss.passwordBtn}
              type="button"
              onClick={togglePasswordVisibility}
            >
              <PasswordIcon className={scss.passwordIcon}/>
            
            </button>
          </label>
          <button className={scss.submitBtn} type="submit">
            {isAuthPending ? (
              <AuthPendingIcon className={scss.authPendingIcon} />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <div>
        <p className={scss.formInfo}>
          * username can contain only letters and <span>spaces</span>, but
          spaces not at the <span>beginning</span> and at the end, the length{" "}
          <span>must</span> be from 3 to 25 characters
        </p>
        <p className={scss.formInfo}>
          * password must contain at least 8 <span>characters</span>, including
          one letter and one <span>number</span>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
