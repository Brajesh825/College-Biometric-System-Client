import React, { useState, useEffect } from "react";
import "./Table.css";
import { StudentDetails } from "../../data/StudentDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { openStudentDetailsModal, setFilteredStudents, setStudentDetails } from "../../Redux/Reducers/appInfoSlice";
import studentInfoSlice, {
  getAllStudentsDetails,
} from "../../Redux/Reducers/studentInfoSlice";

const Table = () => {

  const dispatch = useDispatch();

  const { selectedOption } = useSelector((state) => state.appInfo);
  const { allStudentsDetails } = useSelector((state) => state.student);
  const {studentDetailsModal}= useSelector(state=>state.appInfo)

  //dropdown to select the option visibilty
  const [dropdownVisibility, setDropdownVisibility] = useState({
    year: false,
    branch: false,
    attendance: false,
  });

  const [studentsData, setStudentsData] = useState(allStudentsDetails);

  //year options in dropdown
  const batchFilter = ["2019", "2020", "2021", "2022"];

  //branch options in dropdown
  const branchFilter = ["CSE", "EEE", "Civil", "Machanical", "Mining"];

  //attendence options in dropdown
  const attendenceFilter = ["0-50", "50-75", "75-100", "All"];

  //fetching attendance of all students
  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(()=>{
    setStudentsData(allStudentsDetails);
  },[allStudentsDetails])

  const getAllStudents = () => {
    fetch("http://localhost:4000/api/v1/students/")
      .then((response) => response.json())
      .then(async (data) => {
        // Process the fetched data
        const studentsData = await data.allStudentsData.map(async (student) => {
          let response = await fetch(
            `http://localhost:4000/api/v1/student/attendence/${student.EmpCode}`
          );

          response = await response.json();

          const attendanceArray = response.student.attendence;

          let totalPresentDays = 0;
          let totalAbsentDays = 0;

          for (let i = 0; i < attendanceArray.length; i++) {
            const monthAttendance = attendanceArray[i];
            totalAbsentDays += monthAttendance.absentDays;
            totalPresentDays += monthAttendance.presentDays;
          }

          const percentageAttendance = calculateAttendancePercentage(
            totalPresentDays,
            totalAbsentDays
          );

          student.totalAttendance = percentageAttendance;

          return student;
        });
        const finalData = await Promise.all(studentsData);
        dispatch(getAllStudentsDetails(finalData));
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const calculateAttendancePercentage = (presentDays, absentDays) => {
    return (presentDays / (presentDays + absentDays)) * 100;
  };

  const handleDropdownClick = (dropdown) => {
    setDropdownVisibility({
      year: dropdown === "year",
      branch: dropdown === "branch",
      attendance: dropdown === "attendance",
    });
  };

  //table row color according to attendence
  const getColor = (attendance) => {
    if (attendance <= 50) return "#FDD8DA";
    else if (attendance > 50 && attendance <= 75) return "#FBF0DA";
    else if (attendance > 75 && attendance <= 100) return "#E5FADB";
  };

  //removing dropdown on click of outside
  const handleOutsideClick = (event) => {
    const isDropdownClick =
      event.target.classList.contains("dropdown-option") ||
      event.target.classList.contains("fa-filter");

    if (!isDropdownClick) {
      setDropdownVisibility({
        sector: false,
        state: false,
        growth: false,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const viewButtonHandler = (detail)=>{
    dispatch(openStudentDetailsModal());
    dispatch(setStudentDetails(detail));
  }

  let filterStudents = StudentDetails;
  //Filter out OrganistationDetails
  if (selectedOption.length > 0) {
    // Filtering the OrganistationDetails array based on the selected options
    filterStudents = StudentDetails.filter((student) => {
      return (
        selectedOption.includes(student.year) ||
        selectedOption.includes(student.branch)
      );
    });
  }

  return (
    <div>
      <table className="custom-table">
        {/* table heading */}
        <thead>
          <tr>
            <th>
              <FontAwesomeIcon
                icon={faSquare}
                style={{
                  fontSize: "24px",
                  color: "#2A3238",
                }}
              />
            </th>
            <th>Name</th>
            <th
              onClick={() => handleDropdownClick("year")}
              className="dropdown-option"
            >
              Batch{" "}
              <FontAwesomeIcon
                icon={faFilter}
                style={{
                  fontSize: "16px",
                  color: "#707070",
                  marginLeft: "10px",
                }}
              />
              {/* Filter Dropdown For Year */}
              {dropdownVisibility.year && (
                <Dropdown options={batchFilter}></Dropdown>
              )}
            </th>
            <th
              onClick={() => handleDropdownClick("branch")}
              className="dropdown-option"
            >
              Branch
              <FontAwesomeIcon
                icon={faFilter}
                style={{
                  fontSize: "16px",
                  color: "#707070",
                  marginLeft: "10px",
                }}
              />
              {/* Filter Dropdown For Branch */}
              {dropdownVisibility.branch && (
                <Dropdown options={branchFilter}></Dropdown>
              )}
            </th>
            <th
              onClick={() => handleDropdownClick("attendance")}
              className="dropdown-option"
            >
              Attendance
              <FontAwesomeIcon
                icon={faFilter}
                style={{
                  fontSize: "16px",
                  color: "#707070",
                  marginLeft: "10px",
                }}
              />
              {/* Filter Dropdown For Attendence */}
              {dropdownVisibility.attendance && (
                <Dropdown options={attendenceFilter}></Dropdown>
              )}
            </th>
            <th>Registeration No</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {studentsData && 
            studentsData.map((detail) => (
              <tr
                style={{
                  background: getColor(detail.totalAttendance.toFixed(2)),
                }}
              >
                <td>
                  <div className="center">
                    <FontAwesomeIcon
                      icon={faSquare}
                      style={{
                        fontSize: "24px",
                        color: "#2A3238",
                      }}
                    />
                  </div>
                </td>
                <td>{detail.name}</td>
                <td>{detail.batch}</td>
                <td>{detail.branch}</td>
                <td>{detail.totalAttendance.toFixed(2)}</td>
                <td>{detail.registrationNumber}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="viewButton" onClick={()=>viewButtonHandler(detail)}>View</span>
                    <div className="verticalLine"></div>
                    <span className="messageButton">Message</span>
                  </div>
                </td>
                
              </tr>
              
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
