import React from "react";

import "./button.styles.scss";

export const TYPES = {
  PRIMARY: "btn--primary",
  SECONDARY: "btn--secondary",
  DELETE: "btn--delete"
};

export const Button = ({ title, buttonType, onClick, disabled, type }) => (
  <button
    type={type}
    className={`${buttonType} btn`}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
