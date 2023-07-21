import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { closeStudentDetailsModal } from "../../Redux/Reducers/appInfoSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MyCalender from "../MyCalender/MyCalender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../Hooks/useFetch";
import "./StudentDetails.css";

const StudentDetails = () => {
  const dispatch = useDispatch();

  const { studentDetailsModal } = useSelector((state) => state.appInfo);
  const { studentDetails } = useSelector((state) => state.appInfo);

  const [attendance, setAttendance] = useState();

  const closeModal = () => {
    dispatch(closeStudentDetailsModal());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/student/attendence/${studentDetails.EmpCode}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAttendance(data.student.attendence[0]);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  console.log("attendence", attendance);

  return (
    <Modal
      isOpen={studentDetailsModal}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
         <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ fontSize: "24px", float:'right', paddingBottom:'10px' }} onClick={closeModal}
            />
      <div style={{display:'flex', justifyContent:'space-between',  alignItems:'center'}}><div >
        <h2>{studentDetails.name}</h2>
        <h5>Present Days- {attendance?.presentDays}</h5>
      </div>
      <div>
        <h5>Emp. Code -{studentDetails.EmpCode}</h5>
        <h5>Reg. No.{studentDetails.registrationNumber}</h5>
      </div></div>

      <MyCalender attendance={attendance?.days} />
    </Modal>
  );
};

export default StudentDetails;
