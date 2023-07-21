import React, { useEffect, useState } from "react";
import "./UploadStudentCSV.css";
import Button from "../Button/Button";
import { addAttendance, setUploadedStudentsDetails } from "../../Redux/Reducers/attendanceInfoSlice";
import { batch, useDispatch, useSelector } from "react-redux";
import { Selector } from "@reduxjs/toolkit";
import { closeBulkStudentAddModal, closeStudentDataUploadingLoader, openStudentDataUploadingLoader, openSuccessAlert } from "../../Redux/Reducers/appInfoSlice";

const UploadStudentCSV = ({title}) => {
  const dispatch = useDispatch();

  const { attendanceReport } = useSelector((state) => state.attendance)
  const {studentDataUploadingLoader}= useSelector(state=>state.appInfo)


  const handleFileUpload = (event) => {

    dispatch(openStudentDataUploadingLoader())

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("student", file);

    fetch("http://localhost:4000/api/v1/uploadStudents", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async(data) => {
        dispatch(closeStudentDataUploadingLoader());
        dispatch(closeBulkStudentAddModal());
        dispatch(openSuccessAlert());
        dispatch(setUploadedStudentsDetails(data.myStudents));
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

 

  return (
    <div className="uploadCSVBox">
      <div className="uploadCSV">
        <input
          type="file"
          id="uploadInput"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        ></input>
        <div onClick={() => document.getElementById("uploadInput").click()}>
          <Button title="UPLOAD CSV FILE" onClickHandler={()=>{console.log("clicked");}}/>
        </div>

        <div>{studentDataUploadingLoader?"Data is Uploading" : "or Drop Files"}</div>
      </div>
      <span>{title}</span>
    </div>
  );
};

export default UploadStudentCSV;
