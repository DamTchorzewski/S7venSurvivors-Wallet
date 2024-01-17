import React from 'react';
import Icons from './icons.svg';

const Svg = ({className, icon, fill, stroke, size}) => (
   <svg className={className}
      fill={fill}
      stroke={stroke}
      width={size} height={size}>
       <use href={`${Icons}#${icon}`} />
   </svg>
);

Svg.defaultProps = {
   size: 30,
};

export default Svg;