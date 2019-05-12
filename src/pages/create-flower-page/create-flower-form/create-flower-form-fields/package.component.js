import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import { fetchSensors } from "../../../../common/sensors/sensors.middleware";

class Package extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }

  availableSensors = data =>
    data.every(
      data => Object.entries(data).length !== 0 && data.constructor === Object
    );

  render() {
    const sensors = sensor => {
      return sensor.dh22Err ||
        sensor.soilErr ||
        sensor.socketErr ||
        !this.availableSensors(sensor)
        ? false
        : true;
    };

    return (
      <Field
        id="package"
        name="package_id"
        label="Select sensor"
        className="form__constrols--sensor"
        description={"Select sensors you have attached to your flower"}
        disabled={!sensors(this.props.sensors) ? true : false}
        component={this.props.validForm}
      >
        {sensors(this.props.sensors) ? (
          this.props.sensors.map(sensor => {
            return (
              <option
                key={sensor.pack.name}
                value={sensor.pack.package_id}
                className="sensor"
              >
                {sensor.pack.name}
              </option>
            );
          })
        ) : (
          <option className="no-sensor" key={"no-sensor"} value="">
            No sensors
          </option>
        )}
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
