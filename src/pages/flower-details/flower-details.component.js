import React, { Component } from "react";
import Header from "../../common/header/header.component";
import io from "socket.io-client";

import "./flower-details.scss";
class FlowerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      soilMoisture: "",
      airHumidity: ""
    };
  }
  componentDidMount() {
    const socket = io.connect("http://localhost:1335", {
      reconnection: true
    });
    socket.on("clientEvent", data => {
      this.setState({
        temperature: data.sensors.temperature,
        airHumidity: data.sensors.humidity,
        soilMoisture: data.sensors.soilMoisture["Sensor data"]
      });
    });
    socket.on("connect_error", data => {
      console.log("connection error");
    });
  }
  render() {
    console.log(
      this.state.temperature,
      this.state.soilMoisture,
      this.state.airHumidity
    );

    const temp = {
      width: `${this.state.temperature}%`,
      transition: "width 800ms ease-in-out"
    };

    const soil = {
      width: `${this.state.soilMoisture}%`,
      transition: "width 800ms ease-in-out"
    };

    const air = {
      width: `${this.state.airHumidity}%`,
      transition: "width 800ms ease-in-out"
    };

    const scales = (
      <div className="bars">
        <p>Temperature</p>
        <div className="red">
          <div className="blue" style={temp} />
        </div>
        <p>Air Humidity</p>
        <div className="red">
          <div className="blue" style={air} />
        </div>
        <p>Soil Moisture</p>
        <div className="red">
          <div className="blue" style={soil} />
        </div>
      </div>
    );
    return (
      <div className="flower-details">
        <Header title="Flower Details" />
        {scales}
      </div>
    );
  }
}

export default FlowerDetails;
