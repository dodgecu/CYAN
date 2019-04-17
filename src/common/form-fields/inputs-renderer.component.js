import React from "react";

const inputsRenderer = render => ({
  input,
  meta,
  label,
  id,
  name,
  ...rest
}) => (
  <div className="form__group">
    <label className="form__group-title" htmlFor={label}>
      {label}
    </label>
    {render(input, label, id, name, rest)}

    {meta.error && meta.touched && (
      <span className="form__group--error">{meta.error}</span>
    )}
  </div>
);

export default inputsRenderer;
