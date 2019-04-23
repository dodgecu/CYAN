import React from "react";

const inputsRenderer = render => ({
  input,
  meta: { touched, error },
  label,
  id,
  name,
  className,
  ...rest
}) => (
  <div className="form__group">
    <label className="form__group-title" htmlFor={label}>
      {label}
    </label>
    {render(input, touched, error, label, id, name, className, rest)}
    {error && touched && <span className="form__group--error">{error}</span>}
  </div>
);

export default inputsRenderer;
