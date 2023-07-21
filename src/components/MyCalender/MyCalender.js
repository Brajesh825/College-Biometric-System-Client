import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalender.css";

function MyCalendar({ attendance }) {
  console.log(attendance);

  const checkAttendance = (date) => {
    if (attendance) return attendance[date.getDate()];
  };

  const presentDays = ({ date }) => {
    if(checkAttendance(date)?.isPresent==true) return "present" ;
    else return "absent";
    console.log(checkAttendance(date)?.isWorkingDay);
  };

  return (
    <div>
      <Calendar tileClassName={presentDays} />
    </div>
  );
}

export default MyCalendar;
