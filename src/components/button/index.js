import React from "react";
import "./styles.scss";

const Button = (props) => {
  return (
    <div
      className="button"
      style={{ maxHeight: props.maxHeight, maxWidth: props.maxWidth }}
    >
      {props.children}
    </div>
  );
};

export default Button;
