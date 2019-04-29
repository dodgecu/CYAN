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
        name="package"
        label="Select sensor"
        description={"Select sensors you have attached to your flower"}
        component={this.props.validForm}
      >
        {[this.props.sensors].map(sensor => {
          return (
            <option
              className="flowerList"
              key={sensor.package_id}
              value={sensor.name}
            >
              {sensor.name}
            </option>
          );
        })}
        }
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
