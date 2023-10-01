import Media from 'react-media';
import s from './pages.module.css'
import frame from '../assets/desktop-login/image-centrum.png';
import frame2x from '../assets/desktop-login/image-centrum@2x.png';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {

  return (
    <>
      <div className={s.common__container}>

            <Media
                query="(min-width: 767px)"
                render={() => (
                    <div className={s.logo__container}>
                    <img 
                        className={s.reg__image} 
                        srcSet={`${frame} 1x, ${frame2x} 2x`}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        src={frame} 
                        alt="" 
                    />
                    <h1 className={s.title}>Finance App</h1>
                    </div>
                )}
            />
            <div className={s.form__container}>
              <LoginForm />
            </div>
        </div>

    </>
  );
};

export default Login;
