import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchSensors } from "../../common/sensors/sensors.middleware";
import { backendUrl } from "../../constants/backendUrl";

import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import FLowerInfo from "./flower-info/flower-info.component";

import "./flower-details.styles.scss";
class FlowerDetails extends Component {
  state = {
    flower: {}
  };

  componentDidMount() {
    axios
      .get(`${backendUrl}/flower-id?id=${this.props.location.state.flower}`)
      .then(flower => {
        const [current_flower] = flower.data;
        this.setState({ flower: current_flower });
      })
      .catch(err => err);

    this.props.fetchSensors();
  }

  validFlowerData = data => {
    return Object.entries(data).length !== 0 && data.constructor === Object;
  };

  render() {
    let flowerInfo;

    const availableSensors = this.props.sensors.every(obj =>
      this.validFlowerData(obj)
    );

    if (this.validFlowerData(this.state.flower)) {
      const {
        name,
        type,
        airTemperature,
        airHumidity,
        light,
        soilHumidity,
        created_at,
        img_path
      } = this.state.flower;
      if (availableSensors) {
        const flowerId = parseInt(this.state.flower.package_id);

        const [pack] = this.props.sensors.filter(item => {
          return item.pack.package_id === flowerId;
        });

        const {
          humidity,
          light,
          soilMoisture,
          temperature
        } = pack.pack.sensors;
        flowerInfo = (
          <FLowerInfo
            flowerName={name}
            thumb={img_path}
            type={type}
            soil={soilMoisture["Sensor data"]}
            temperature={temperature}
            humidity={humidity}
            light={light}
            created_at={created_at}
            connected={true}
          />
        );
      } else {
        flowerInfo = (
          <FLowerInfo
            flowerName={name}
            thumb={img_path}
            type={type}
            soil={soilHumidity}
            temperature={airTemperature}
            humidity={airHumidity}
            light={light}
            created_at={created_at}
            connected={false}
          />
        );
      }
    }

    return (
      <>
        <Header />
        <PageTitle title="Flower details" />
        {flowerInfo}
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
