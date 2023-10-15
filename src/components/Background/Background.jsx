import React from 'react'
import css from './Background.module.css'
import elipseOrange from '../../assets/desktop-login/element-up.png'
import elipsePurple from '../../assets/desktop-login/element-down.png'

const Background = () => {
  return (
    <div className={css.backgroundColor}>
      <img src={elipseOrange} className={css.backgroundOrange}></img>
      <img src={elipsePurple} className={css.backgroundPurple}></img>
    </div>
  );
};

export default Background