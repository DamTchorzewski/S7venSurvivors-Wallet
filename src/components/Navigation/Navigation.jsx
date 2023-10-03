import { NavLink } from 'react-router-dom';
import iconHome from '../../assets/svg/home.svg';
import iconDiagram from '../../assets/svg/statistics.svg';
import iconCurrency from '../../assets/svg/dollar.svg';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/S7venSurvivors-Wallet/dashboard" className={styles.navLink} end>
            <img className={styles.icon} alt="home" src={iconHome}/>
            <p className={styles.text}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="diagram" className={styles.navLink}>
            <img className={styles.icon} alt="diagram" src={iconDiagram}/>
            <p className={styles.text}>Statistics</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="currency" className={styles.navLink}>
            <img className={styles.icon} alt="currency" src={iconCurrency}/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation