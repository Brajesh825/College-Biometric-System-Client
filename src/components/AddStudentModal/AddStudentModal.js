import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddStudentModal.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeBulkStudentAddModal, openBulkStudentAddModal } from '../../Redux/Reducers/appInfoSlice';
import UploadStudentCSV from '../UploadStudentCSV/UploadStudentCSV';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import HorizontalLoader from '../HorizontalLoader/HorizontalLoader';

const AddStudentModal = () => {

  const dispatch=useDispatch()

 const {bulkStudentAddModal}= useSelector(state=>state.appInfo)

 const {studentDataUploadingLoader}= useSelector(state=>state.appInfo)


  
  const closeModal = () => {
    dispatch(closeBulkStudentAddModal())
  };

  return (
    <div>
      <Modal
        isOpen={bulkStudentAddModal}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
         <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ fontSize: "24px", float:'right', paddingBottom:'10px' }} onClick={closeModal}
            />
        <UploadStudentCSV title="Add Multiple Student Data"/>
        {studentDataUploadingLoader && <HorizontalLoader/>}
      </Modal>
    </div>
  );
};


export default AddStudentModal;
