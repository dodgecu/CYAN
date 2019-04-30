import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import { fetchSensors } from "../../../../common/sensors/sensors.middleware";

class Package extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }
  render() {
    return (
      <Field
        id="package"
        name="package_id"
        label="Select sensor"
        className="form__constrols--sensor"
        description={"Select sensors you have attached to your flower"}
        component={this.props.validForm}
      >
        {[this.props.sensors].map((sensor, index) => {
          return (
            <option className="sensor" key={index} value={sensor.package_id}>
              {sensor.name}
            </option>
          );
        })}
      </Field>
    );
  }
}

const mapStateToProps = state => {
  return state.sensors;
};

export default connect(
  mapStateToProps,
  { fetchSensors }
)(Package);
