import React, { Component } from "react";
import { Field } from "redux-form";

const flowers = [
  { id: 1, name: "Rose of China" },
  { id: 2, name: "Flowering Maple" },
  { id: 3, name: "Flamingo Flower" },
  { id: 4, name: "Kaffir Lily" },
  { id: 5, name: "Flaming Katy" },
  { id: 6, name: "Lollipop Plant" },
  { id: 7, name: "Moth Orchid" },
  { id: 8, name: "Zebra Plant" }
];

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
