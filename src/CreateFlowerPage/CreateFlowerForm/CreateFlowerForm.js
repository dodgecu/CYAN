import React from "react";
import { reduxForm } from "redux-form";
import ValidateFields from "./ValidateFields";
import Name from "./Fields/Name";
import FlowerType from "./Fields/FlowerType";
import AirHumidity from "./Fields/AirHumidity";
import SoilHumidity from "./Fields/SoilHumidity";
import AirTemp from "./Fields/AirTemp";
import Light from "./Fields/Light";

const { validate, RenderInput, RenderSelect, RenderRange } = ValidateFields;

const createFlower = props => {
  const { handleSubmit } = props;
  return (
    <div className="create-flower">
      <form className="create-flower__form" onSubmit={handleSubmit}>
        <Name validForm={RenderInput} />
        <FlowerType validForm={RenderSelect} />
        <AirHumidity validForm={RenderRange} />
        <SoilHumidity validForm={RenderRange} />
        <AirTemp validForm={RenderRange} />
        <Light validForm={RenderRange} />
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
