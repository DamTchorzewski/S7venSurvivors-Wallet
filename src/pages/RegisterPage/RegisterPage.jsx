import { RegisterForm } from "../../components/AuthForms/RegisterForm/RegisterForm";
import s from "./RegisterPage.module.css";

export const Register = () => {
    return (
        <>
            <div className={s.signupContainer}>
                <div className={s.signupFormContainer}>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

