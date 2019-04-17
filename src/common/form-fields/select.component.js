import React from "react";

import inputsRenderer from "./inputs-renderer.component";

const select = inputsRenderer((input, label, id, name, { children }) => {
  return (
    <div className="form__controls">
      <select
        className="form__controls--select "
        id={id}
        {...input}
        name={name}
        label={label}
      >
        {children}
      </select>
    </div>
  );
});

export default select;
