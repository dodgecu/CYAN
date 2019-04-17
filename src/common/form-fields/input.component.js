import React from "react";

import inputsRenderer from "./inputs-renderer.component";

const input = inputsRenderer((input, label, id, name) => {
  return (
    <div className="form__controls">
      <input id={id} {...input} name={name} type="text" placeholder={label} />
    </div>
  );
});

export default input;
