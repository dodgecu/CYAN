import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import { fetchSensors } from "../../../../common/sensors/sensors.middleware";

class Package extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }

  render() {
    let sensorAvailable = true;

    this.props.sensors.map(sensor =>
      Object.keys(sensor).length === 0
        ? (sensorAvailable = false)
        : (sensorAvailable = true)
    );
    return (
      <Field
        id="package"
        name="package_id"
        label="Select sensor"
        className="form__constrols--sensor"
        description={"Select sensors you have attached to your flower"}
        disabled={!sensorAvailable ? true : false}
        component={this.props.validForm}
      >
        {this.props.sensors.map((item, i) => {
          return item.pack === undefined ? (
            <option className="no-sensor" key={i} value="">
              no sensors
            </option>
          ) : (
            <option
              key={item.pack.name}
              value={item.pack.package_id}
              className="sensor"
            >
              {item.pack.name}
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
