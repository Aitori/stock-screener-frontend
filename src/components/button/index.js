import React from "react";
import "./styles.scss";

const Button = (props) => {
  return (
    <div
      className={`${props.className} button`}
      style={{ maxHeight: props.maxHeight, maxWidth: props.maxWidth }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Button;
