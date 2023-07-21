import React from "react";
import "./DashboardContent.css";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFileArrowDown,
  faGear,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Filterbutton from "../Filterbutton/Filterbutton";
import Table from "../Table/Table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openBulkStudentAddModal } from "../../Redux/Reducers/appInfoSlice";
import icon from './../../images/add_button.png'
import StudentDetails from "../StudentDetails/StudentDetails";


const DashboardContent = () => {

  const dispatch=useDispatch();
  
  const { selectedOption,bulkStudentAddModal } = useSelector((state) => state.appInfo);
  const { allStudentsDetails } = useSelector((state) => state.student)
  const {studentDetailsModal}= useSelector(state=>state.appInfo)

  const onClickHandler=()=>{
    dispatch(openBulkStudentAddModal())
  }

  return (
    <div className="dashboardContent">
      {/* info part */}
      <div className="dasbboardInfo">
        <span>Student's Detail</span>
        <div>
          <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: "24px" }} />
          <FontAwesomeIcon
            icon={faFileArrowDown}
            style={{ fontSize: "24px" }}
          />
          <FontAwesomeIcon icon={faGear} style={{ fontSize: "24px" }} />
          <FontAwesomeIcon
            icon={faTableCellsLarge}
            style={{ fontSize: "24px" }}
          />
        </div>
      </div>

      {/* student count, eligible, ineligible & total */}
      <div className="countInfo">
  
        <Card title="Total No. Of Students" background="#EDF3FD" text={allStudentsDetails.length}/>
        <Card title="Attendance (0-49%)" background="#FDD8DA" text={allStudentsDetails.filter((elem)=>{
          return elem.totalAttendance>=0 && elem.totalAttendance<50
        }).length}/>
        <Card title="Attendance (50-74%)" background="#FBF0DA" text={allStudentsDetails.filter((elem)=>{
          return elem.totalAttendance>=50 && elem.totalAttendance<75
        }).length}/>
        <Card title="Attendance (75% +)" background="#E5FADB" text={allStudentsDetails.filter((elem)=>{
          return elem.totalAttendance>=75 && elem.totalAttendance<100
        }).length}/>
      </div>

      <div className="filter_table">
        <div className="filterSection">
          <Search />
          <div>

            {selectedOption.map((item) => (
              <Filterbutton title={item} />
            ))}

          </div>
          <div>
            <Button title="ADD NEW" />
            <div className='button' onClick={()=>onClickHandler()}><img src={icon}></img>ADD MULTIPLE</div>
          </div>
        </div>

        <Table />
        {studentDetailsModal && <StudentDetails/>}
      </div>
    </div>
  );
};

export default DashboardContent;
