import React from "react";

import Range from "react-input-range";

import "react-input-range/lib/css/index.css";
import "./range.styles.scss";

import inputsRenderer from "./inputs-renderer.component";

const range = inputsRenderer(
  (
    input,
    touched,
    error,
    label,
    id,
    name,
    className,
    unit,
    maxValue,
    minValue,
    step
  ) => {
    const val = input.value === "" ? (input.value = 0) : input.value;
    return (
      <div id={id} className="form__controls">
        <Range
          name={name}
          className={className}
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

export default range;
