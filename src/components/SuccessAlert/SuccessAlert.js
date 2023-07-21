import React from 'react';
import Modal from 'react-modal';
import './SuccessAlert.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeSuccessAlert } from '../../Redux/Reducers/appInfoSlice';


const SuccessAlert = ({title}) => {

    const dispatch = useDispatch();

    const {successAlert}= useSelector(state=>state.appInfo)
    const {uploadedStudentsDetails}=useSelector(state=>state.attendance)

    const onClose= ()=>{
        dispatch(closeSuccessAlert())
    }

  return (
    <Modal
      isOpen={successAlert}
      onRequestClose={successAlert}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="success-alert">
        <h2>Success!</h2>
        <p>{title}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SuccessAlert;
