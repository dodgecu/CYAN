import React from "react";
import Range from "react-input-range";
import "react-input-range/lib/css/index.css";

// PRIVATE
const _inputsRenderer = render => ({
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

const validate = field => {
  const errors = {};
  if (!field.name) {
    errors.name = "Please, give your plant a nickname";
  }
  if (!field.type) {
    errors.type = "Please, select type of your flower";
  }
  if (!field.airHumidity) {
    errors.airHumidity = "Please, specify humidity of the air";
  }
  if (!field.soilHumidity) {
    errors.soilHumidity = "Please, specify humidity of the soil";
  }
  if (!field.airTemperature) {
    errors.airTemperature = "Please, specify temperature of the air";
  }
  if (!field.light) {
    errors.light = "Please, specify light value";
  }

  return errors;
};

const RenderInput = _inputsRenderer((input, label, id, name) => {
  return (
    <div className="form__controls">
      <input id={id} {...input} name={name} type="text" placeholder={label} />
    </div>
  );
});

const RenderSelect = _inputsRenderer((input, label, id, name, { children }) => {
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

const RenderRange = _inputsRenderer(
  (input, label, id, name, unit, maxValue, minValue, step) => {
    const val = input.value === "" ? (input.value = 0) : input.value;
    return (
      <div id={id} className="form__controls">
        <Range
          name={name}
          label={label}
          value={val}
          formatLabel={value => `${value} ${unit.unit}`}
          maxValue={unit.maxValue}
          minValue={unit.minValue}
          step={unit.step}
          onBlur={input.onBlur}
          onChange={input.onChange}
          onDragStart={input.onDragStart}
          onDrop={input.onDrop}
          onFocus={input.onFocus}
        />
      </div>
    );
  }
);

export default {
  validate,
  RenderInput,
  RenderSelect,
  RenderRange
};
