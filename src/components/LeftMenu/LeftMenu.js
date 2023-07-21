import React from "react";
import "./LeftMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUserGroup,
  faClipboard,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Hr from "../Hr/Hr";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
  const navigation = useNavigate();


  //for navigation
  const navigate = (route) => () => {
    navigation(route);
  };

  const items = [
    {
      content: "Attendance",
      icon: faCalendarDays,
      route: "/attendance",
    },
    {
      content: "Student",
      icon: faUserGroup,
      route: "/",
    },
    {
      content: "Announcement",
      icon: faClipboard,
      route: "/attendance",
    },
    {
      content: "Other",
      icon: faCalendarDays,
      route: "/",
    },
    {
      content: "Log Out",
      icon: faPowerOff,
      route: "/",
    },
  ];

  return (
    <div className="leftMenu">
      {items.map((menu) => (
        <React.Fragment key={menu.content}>
          <div
            className="leftMenuContent"
            onClick={() => navigate(menu.route)()}
          >
            <FontAwesomeIcon
              icon={menu.icon}
              style={{ fontSize: "24px" }}
            />
            <span>{menu.content}</span>
          </div>
          <Hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default LeftMenu;
