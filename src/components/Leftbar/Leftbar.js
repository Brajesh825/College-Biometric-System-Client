import React from "react";
import "./Leftbar.css";
import logo from "./../../images/logo.png";
import college_logo from "./../../images/college_logo.png";
import Hr from "../Hr/Hr";
import LeftMenu from "../LeftMenu/LeftMenu";

const Leftbar = () => {
  return (
   <div className="leftbar">
   {/* logo of software */}
   <div className="logo"><img src={logo} alt="logo"></img></div>
   <Hr />

   {/* college logo and name */}
   <div className="college_info">
     <img src={college_logo} alt="college_logo"></img>
     <div>
       <span style={{ fontWeight: 200 }}>Welcome</span>
       <span className="college_name">GEC ARWAL</span>
     </div>
   </div>

   <Hr/>
   <LeftMenu/>
 </div>
  );
};

export default Leftbar;
