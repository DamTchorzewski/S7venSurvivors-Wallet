import Media from 'react-media';
import s from './pages.module.css'
import frame from '../assets/desktop-login/image-centrum.png';
import frame2x from '../assets/desktop-login/image-centrum@2x.png';
import Loader from '../components/Loader/Loader';
import useAuth from '../utils/hooks/useAuth';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
  const { isAuthLoading } = useAuth();

  return (
    <>
      <div className={s.commonContainer}>
            <Media
                query="(min-width: 767px)"
                render={() => (
                    <div className={s.logoContainer}>
                    <img 
                        className={s.regImage} 
                        srcSet={`${frame} 1x, ${frame2x} 2x`}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        src={frame} 
                        alt="" 
                    />
                    <h1 className={s.title}>Finance App</h1>
                    </div>
                )}
            />
            <div className={s.formContainer}>
              <LoginForm />
            </div>
        </div>
      <Loader isVisible={isAuthLoading} />
    </>
  );
};

export default Login;
