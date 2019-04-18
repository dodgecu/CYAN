import React from "react";
import { Field } from "redux-form";

const soilHumidity = props => {
  return (
    <Field
      step={1}
      minValue={0}
      maxValue={100}
      unit="RH"
      id="soilHumidity"
      name="soilHumidity"
      label="Soil humidity"
      component={props.validForm}
    />
  );
};

export default soilHumidity;
