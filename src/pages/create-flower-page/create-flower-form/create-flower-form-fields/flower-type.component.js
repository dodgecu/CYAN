import React, { Component } from "react";
import { Field } from "redux-form";

import flowers from "../../../../constants/flowers";

class flowerType extends Component {
  render() {
    return (
      <Field
        label="Flower Type"
        id="flower-select"
        name="flowerSelect"
        className="form__controls--select"
        component={this.props.validForm}
      >
        {flowers.map(flower => {
          return (
            <option className="flowerList" key={flower.id} value={flower.name}>
              {flower.name}
            </option>
          );
        })}
      </Field>
    );
  }
}
export default flowerType;
