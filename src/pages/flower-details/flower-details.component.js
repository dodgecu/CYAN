import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSensors } from "../../common/sensors/sensors.middleware";

class FlowerDetails extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }
  render() {
    console.log(this.props.sensors);
    return <h1>Flower Details</h1>;
  }
}

const mapStateToProps = state => {
  return state.sensors;
};

export default connect(
  mapStateToProps,
  { fetchSensors }
)(FlowerDetails);
