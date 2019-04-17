import React from "react";
import { Field } from "redux-form";

const airTemp = props => {
  return (
    <Field
      step={1}
      minValue={0}
      maxValue={100}
      unit="C°"
      id="airTemperature"
      name="airTemperature"
      label="Air Temperature"
      component={props.validForm}
    />
  );
};

export default airTemp;
