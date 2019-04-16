import React from "react";
import { Field } from "redux-form";

const flowerType = props => {
  return (
    <Field
      step={1}
      minValue={0}
      maxValue={100}
      unit="RH"
      id="airHumidity"
      name="airHumidity"
      label="Air humidity"
      component={props.validForm}
    />
  );
};

export default flowerType;
