import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import { fetchSensors } from "../../../../common/sensors/sensors.middleware";

class Package extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }

  render() {
    const sensorsAvailable = Object.entries(this.props.sensors).length;
    let output;
    if (sensorsAvailable <= 0) {
      output = <option>No sensors are currently available</option>;
    } else {
      output = [this.props.sensors].map((sensor, index) => {
        return (
          <option className="sensor" key={index} value={sensor.package_id}>
            {sensor.name}
          </option>
        );
      });
    }
    return (
      <Field
        id="package"
        name="package_id"
        label="Select sensor"
        className="form__constrols--sensor"
        description={"Select sensors you have attached to your flower"}
        disabled={sensorsAvailable === 0 ? true : false}
        component={this.props.validForm}
      >
        {output}
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
