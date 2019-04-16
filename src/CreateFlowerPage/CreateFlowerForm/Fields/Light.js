import React from "react";
import { Field } from "redux-form";

const airTemp = props => {
  return (
    <Field
      step={100}
      minValue={0}
      maxValue={100000}
      unit="lux"
      id="light"
      name="light"
      label="Amount of Light"
      component={props.validForm}
    />
  );
};

export default airTemp;
