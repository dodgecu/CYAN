import React from "react";
import { reduxForm } from "redux-form";

import ValidateFields from "./validate-fields";

import AirHumidity from "./create-flower-form-fields/air-humidity.component";
import AirTemp from "./create-flower-form-fields/air-temperature.component";
import AmbientLight from "./create-flower-form-fields/ambient-light.component";
import FlowerName from "./create-flower-form-fields/flower-name.component";
import FlowerType from "./create-flower-form-fields/flower-type.component";
import SoilHumidity from "./create-flower-form-fields/soil-humidity.component";

const { validate, RenderInput, RenderSelect, RenderRange } = ValidateFields;

const createFlower = props => {
  const { handleSubmit } = props;
  return (
    <div className="create-flower">
      <form className="create-flower__form" onSubmit={handleSubmit}>
        <FlowerName validForm={RenderInput} />
        <FlowerType validForm={RenderSelect} />
        <AirHumidity validForm={RenderRange} />
        <SoilHumidity validForm={RenderRange} />
        <AirTemp validForm={RenderRange} />
        <AmbientLight validForm={RenderRange} />
        <input
          type="submit"
          className="create-flower__submit"
          value="Add FLower"
        />
      </form>
    </div>
  );
};

export default reduxForm({
  form: "create-flower-form",
  destroyOnUnmount: false,
  validate
})(createFlower);
