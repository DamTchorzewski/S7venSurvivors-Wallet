import React from 'react'
import css from './Background.module.css'
import elipseOrange from '../../utils/elipse-orange.png'
import elipsePurple from '../../utils/elipse-purple.png'

const Background = () => {
  return (
    <div className={css.backgroundColor}>
      <img src={elipseOrange} className={css.backgroundOrange}></img>
      <img src={elipsePurple} className={css.backgroundPurple}></img>
    </div>
  );
};

export default Background