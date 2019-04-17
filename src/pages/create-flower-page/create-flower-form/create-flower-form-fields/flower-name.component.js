import React from "react";
import { Field } from "redux-form";

const flowerName = props => {
  return (
    <Field
      id="name"
      name="name"
      label="Flower Nickname"
      component={props.validForm}
    />
  );
};

export default flowerName;
