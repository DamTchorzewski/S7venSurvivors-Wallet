import { RegisterForm } from "../../components/AuthForms/RegisterForm/RegisterForm";
import { Helmet } from "react-helmet";

export const Register = () => {
    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <RegisterForm />
        </>
    );
};

