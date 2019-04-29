import React from "react";
import { Field } from "redux-form";

const airTemp = props => {
  return (
    <Field
      description="The levels of temperature for your flower. The temperature is defined in Celcius"
      step={1}
      minValue={0}
      maxValue={100}
      unit="C°"
      id="airTemperature"
      name="airTemperature"
      label="Air temperature"
      component={props.validForm}
    />
  );
};

export default airTemp;
