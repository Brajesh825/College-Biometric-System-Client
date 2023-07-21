import React from 'react';
import './Button.css';
import icon from './../../images/add_button.png'

const Button = ({title}) => {
  return (
    <div className='button'><img src={icon}></img>{title}</div>
  )
}

export default Button