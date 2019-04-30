import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSensors } from "../../common/sensors/sensors.middleware";

import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import "./flower-details.styles.scss";
class FlowerDetails extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }
  render() {
    const { sensors } = this.props.sensors;
    let scales;
    if (sensors !== undefined) {
      const { humidity, light, soilMoisture, temperature } = sensors;

      const temp = {
        width: `${temperature}%`,
        transition: "width 800ms ease-in-out"
      };

      const soil = {
        width: `${soilMoisture["Sensor data"]}%`,
        transition: "width 800ms ease-in-out"
      };

      const air = {
        width: `${humidity}%`,
        transition: "width 800ms ease-in-out"
      };

      scales = (
        <div className="bars">
          <p>Temperature</p>
          {temperature} C
          <div className="red">
            <div className="blue" style={temp} />
          </div>
          <p>Air Humidity</p>
          {humidity} RH
          <div className="red">
            <div className="blue" style={air} />
          </div>
          <p>Soil Moisture</p>
          {soilMoisture["Sensor data"]} RH
          <div className="red">
            <div className="blue" style={soil} />
          </div>
          <p>Light</p>
          {soilMoisture["Sensor data"]} LUX
          <div className="red">
            <div className="blue" style={soil} />
          </div>
        </div>
      );
    }

    return (
      <>
        <PageTitle title="Flower details" />
        <Header />
        {scales}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.sensors;
};

export default connect(
  mapStateToProps,
  { fetchSensors }
)(FlowerDetails);
