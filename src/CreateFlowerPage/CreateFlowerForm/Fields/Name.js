import React from "react";
import { Field } from "redux-form";

const nameField = props => {
  return (
    <Field
      id="name"
      name="name"
      label="Flower Nickname"
      component={props.validForm}
    />
  );
};

export default nameField;
