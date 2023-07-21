import React from 'react';
import './Filterbutton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeOptions } from '../../Redux/Reducers/appInfoSlice';
import { Dispatch } from 'react';
import {
    faCircleXmark
  } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';

const Filterbutton = ({title}) => {

  const dispatch=useDispatch();

  const removeFilter = (title) => {
    dispatch(removeOptions(title))
  }

  return (
    <div className='filterbutton'>{title}<FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: "24px",color:"#2A3238", marginLeft:'5px' }} onClick={()=>removeFilter(title)} /></div>
  )
}

export default Filterbutton