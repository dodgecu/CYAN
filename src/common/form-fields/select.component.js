import React from "react";

import inputsRenderer from "./inputs-renderer.component";

import "./select.styles.scss";

const select = inputsRenderer(
  (input, touched, error, label, id, name, className, { children }) => {
    return (
      <div className="form__controls">
        <select
          {...input}
          label={label}
          id={id}
          name={name}
          className={className}
        >
          {children}
        </select>
      </div>
    );
  }
);

export default select;
