import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSensors } from "../../common/sensors/sensors.middleware";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";

class Sensors extends Component {
  constructor(props) {
    super(props);

    this.activeSensors = [];
    this.connected = true;
  }

  componentDidMount() {
    this.props.fetchSensors();
  }

  validateSensors = sensors => {
    return sensors.every(
      sensor =>
        Object.entries(sensor).length !== 0 && sensor.constructor === Object
    );
  };

  shouldComponentUpdate() {
    this.activeSensors.length = 0;
    const { sensors } = this.props;
    if (sensors.dh22Err || sensors.soilErr || sensors.socketErr) {
      this.connected = false;
      return true;
    }
    if (this.validateSensors(sensors)) {
      this.connected = true;
      for (let sensor of sensors) {
        this.activeSensors.push(sensor);
      }

      return true;
    }

    return false;
  }

  render() {
    const {
      flower: {
        package_id,
        airHumidity,
        airTemperature,
        soilHumidity,
        delta,
        light,
        name,
        type,
        _id,
        img_path
      }
    } = this.props;

    if (this.connected) {
      const [active] = this.activeSensors.filter(sensor => {
        return sensor.pack.package_id === parseInt(package_id);
      });

      if (active) {
        const {
          sensors: { humidity, temperature, soilMoisture }
        } = active.pack;
        return (
          <div className="dashboard--thumbnail__item">
            <FlowerThumbnail
              name={name}
              type={type}
              soilMoisture={soilMoisture["Sensor data"]}
              airTemperature={temperature}
              airHumidity={humidity}
              ambientLight={temperature}
              picture={img_path}
              id={_id}
              disconnected={false}
            />
          </div>
        );
      }
    }

    // if (sensorData.connected) {
    //   if (sensorData.sensorHumidity + delta < airHumidity) {
    //     this.issues.push({ id: flower._id, problematic: true });
    //   }
    //   if (sensorData.sensorTemperature + delta < airTemperature) {
    //     this.issues.push({ id: flower._id, problematic: true });
    //   }
    //   if (sensorData.sensorSoilMoisture + delta < soilHumidity) {
    //     this.issues.push({ id: flower._id, problematic: true });
    //   }
    //   if (sensorData.sensorLight + delta < light) {
    //     this.issues.push({ id: flower._id, problematic: true });
    //   }
    // }
    // this.issues.push({ id: flower._id, problematic: false });

    // const [currentFlower] = this.issues.filter(id => id.id === flower._id);

    return (
      <div className="dashboard--thumbnail__item">
        <FlowerThumbnail
          name={name}
          type={type}
          soilMoisture={0}
          airTemperature={0}
          airHumidity={0}
          ambientLight={0}
          id={_id}
          picture={img_path}
          disconnected={true}
          issues={false}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.sensors;
};
export default connect(
  mapStateToProps,
  { fetchSensors }
)(Sensors);
