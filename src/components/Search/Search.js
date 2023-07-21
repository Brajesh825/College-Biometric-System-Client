import React from 'react';
import './Search.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className='search'><FontAwesomeIcon icon={faSearch} style={{ fontSize: "24px",color:"#2A3238" }} />Search by Registration No</div>
  )
}

export default Search