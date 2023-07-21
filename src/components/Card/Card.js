import React from "react";
import "./Card.css";

const Card = ({ title,background,text }) => {
  return (
    <div className="card" style={{background}}>
      <span className="card_title">{title}</span>
      <span className="card_subtitle">{text}</span>
    </div>
  );
};

export default Card;
