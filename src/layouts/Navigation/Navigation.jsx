import { NavLink } from 'react-router-dom';
import Svg from '../../utils/Svg/Svg';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <ul className={css.navList}>
        <li>
          <NavLink to="/S7venSurvivors-Wallet/dashboard" className={css.navLink} end>
            <Svg className={css.icon} icon="home" fill="#6E78E8" size="44" />
            <p className={css.text}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="diagram" className={css.navLink}>
            <Svg className={css.icon} icon="diagram" fill="#6E78E8" size="44" />
            <p className={css.text}>Statistics</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="currency" className={css.navLink}>
            <Svg
              className={css.icon}
              icon="currency"
              fill="#6E78E8"
              size="44"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation