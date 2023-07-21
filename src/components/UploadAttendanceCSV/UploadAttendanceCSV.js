import React, { useEffect, useState } from "react";
import "./UploadAttendanceCSV.css";
import Button from "../Button/Button";
import { addAttendance } from "../../Redux/Reducers/attendanceInfoSlice";
import { batch, useDispatch, useSelector } from "react-redux";
import { Selector } from "@reduxjs/toolkit";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";
import { closeStudentDataUploadingLoader, openStudentDataUploadingLoader, openSuccessAlert } from "../../Redux/Reducers/appInfoSlice";

const UploadAttendanceCSV = ({title}) => {
  const dispatch = useDispatch();

  const { attendanceReport } = useSelector((state) => state.attendance);
  const {studentDataUploadingLoader}=useSelector((state)=>state.appInfo)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currMonth, setCurrMonth] = useState(months[attendanceReport.length]);
  const [currYear, setCurrYear] = useState("2023");

  const handleFileUpload = (event) => {

    dispatch(openStudentDataUploadingLoader())
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("year", currYear);
    formData.append("month", currMonth);
    formData.append("attendence", file);

    fetch("http://localhost:4000/api/v1/uploadAttendence", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async(data) => {
        // console.log(data, "Line 48 working");
        const batchArray = ["2023", "2022", "2020", "2019"];
        const branchArray = ["CSE", "EEE", "ME", "CE"];
        let monthAttendanceReport = [];
        for(let i =0;i<4;i++){

          let branchReportData = {

          }

          for(let j=0;j<4;j++){
            const batch = batchArray[i];
            const branch = branchArray[j];

            const branchData = await getBranchWiseAttendanceReport(batch,branch,currMonth,currYear)
            
            branchReportData[branch]= JSON.parse(JSON.stringify(branchData))
            console.log(branchReportData,"branchReportData");
          }

          monthAttendanceReport.push(JSON.parse(JSON.stringify(branchReportData)))
          console.log(monthAttendanceReport,"Report");
        }
        
        // localStorage.setItem('monthAttendanceReport',JSON.stringify(monthAttendanceReport))
        // localStorage.setItem("currMonth",currMonth)
        dispatch(addAttendance(monthAttendanceReport))
        dispatch(closeStudentDataUploadingLoader())
        dispatch(openSuccessAlert())
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  //getting the data saved from local storage
  // useEffect(()=>{
  //   const month=localStorage.getItem('currMonth');
  //   const data = localStorage.getItem('monthAttendanceReport');
  //   console.log(month,"month", currMonth);
  //   if(data && (month!=currMonth)){
  //   dispatch(addAttendance(JSON.parse(data)))
  //   }
  // },[])

 

  const getBranchWiseAttendanceReport = async (batch, branch, month, year) => {
    const data = {
      batch: batch,
      branch: branch,
      month: month,
      year: year,
    };
    let responseData = await fetch("http://localhost:4000/api/v1/report", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    responseData = await responseData.json();
    return responseData.report.reports;
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
          <Button title="UPLOAD CSV FILE" />
        </div>

        <div>or Drop Files</div>
      </div>
      <span>{studentDataUploadingLoader ? "Uploading..." : title}</span>
     { studentDataUploadingLoader && <HorizontalLoader/>}
    </div>
  );
};

export default UploadAttendanceCSV;
