import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import ValidateFields from "../../../common/form-validation";

import AirHumidity from "./create-flower-form-fields/air-humidity.component";
import AirTemp from "./create-flower-form-fields/air-temperature.component";
import AmbientLight from "./create-flower-form-fields/ambient-light.component";
import FlowerName from "./create-flower-form-fields/flower-name.component";
import FlowerType from "./create-flower-form-fields/flower-type.component";
import SoilHumidity from "./create-flower-form-fields/soil-humidity.component";
import Package from "./create-flower-form-fields/package.component";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";

const {
  validate,
  RenderInput,
  RenderSelect,
  RenderRange,
  RenderSelectDefault
} = ValidateFields;

let createFlower = props => {
  const { handleSubmit, change } = props;
  console.log(props);
  return (
    <div className="create-flower">
      <form className="create-flower__form" onSubmit={handleSubmit}>
        <FlowerName validForm={RenderInput} />
        <FlowerType change={change} validForm={RenderSelect} />
        <AirHumidity validForm={RenderRange} />
        <AirTemp validForm={RenderRange} />
        <AmbientLight validForm={RenderRange} />
        <SoilHumidity validForm={RenderRange} />
        <Package validForm={RenderSelectDefault} />
        <Button title="CREATE" type="submit" buttonType={TYPES.PRIMARY} />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.form,
    initialValues: state.flowerType.type,
    type: state.flowerType
  };
};

createFlower = reduxForm({
  form: "create-flower-form",
  validate
})(createFlower);

createFlower = connect(mapStateToProps)(createFlower);

export default createFlower;
