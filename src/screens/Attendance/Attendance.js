import React from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import UploadAttendanceCSV from "../../components/UploadAttendanceCSV/UploadAttendanceCSV";
import Graph from "../../components/Graph/Graph";
import { useSelector } from "react-redux";
import DataNotFound from "../../components/DataNotFound/DataNotFound";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";

const Attendance = () => {
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

  return (
    <div className="attendance">
      <Leftbar />
      <div
        style={{
          marginLeft: "22%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {attendanceReport.length > 0 ? <Graph /> : <DataNotFound/>}

        <UploadAttendanceCSV title={"Upload "+months[attendanceReport.length]+" Attendance"} />

       <SuccessAlert title={`Attendence for ` + months[attendanceReport.length-1]+ ` Month is Uploaded`}/>
      </div>
    </div>
  );
};

export default Attendance;
