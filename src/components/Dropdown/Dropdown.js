import React,{useState, useEffect} from 'react';
import './Dropdown.css';
import { useDispatch } from 'react-redux';
import { selectOptions } from '../../Redux/Reducers/appInfoSlice';


const Dropdown = ({options}) => {

  const dispatch =useDispatch()
    
const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

//Add filter
  useEffect(()=>{
    if(selectedOption!=="")
    dispatch(selectOptions(selectedOption))
  },[selectedOption])

  return (
   <div>{isDropdownOpen && (
    <div className="custom-dropdown">
      {options.map((option) => (
        <div
          key={option}
          className="dropdown-option"
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  )}</div>
  )
}

export default Dropdown