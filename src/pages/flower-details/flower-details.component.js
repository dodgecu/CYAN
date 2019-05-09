import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import axios from "axios";

import { fetchSensors } from "../../common/sensors/sensors.middleware";
import { backendUrl } from "../../constants/backendUrl";
import routes from "../../constants/routes";

import Chart from "./chart/chart.component";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";
import { Button, TYPES } from "../../common/components/button/button.component";
import Footer from "../../common/footer/footer.component";

import FLowerInfo from "./flower-info/flower-info.component";

import "./flower-details.styles.scss";
class FlowerDetails extends Component {
  state = {
    flower: {}
  };

  componentDidMount() {
    if (typeof this.props.location.state !== "undefined") {
      axios
        .get(`${backendUrl}/flower-id?id=${this.props.location.state.flower}`)
        .then(flower => {
          const [current_flower] = flower.data;
          this.setState({ flower: current_flower });
        })
        .catch(err => err);

      this.props.fetchSensors();
    } else {
      this.props.history.push(routes.dashboard);
    }
  }

  validFlowerData = data => {
    return Object.entries(data).length !== 0 && data.constructor === Object;
  };

  redirect = () =>
    this.props.push(routes.createFlower, {
      currentFlower: this.state.flower
    });

  render() {
    let flowerInfo;

    const availableSensors = obj => {
      if (obj.dh22Err || obj.soilErr || obj.socketErr) {
        return false;
      } else {
        return obj.every(obj => this.validFlowerData(obj));
      }
    };

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

      const flowerLight = light;

      if (
        availableSensors(this.props.sensors) &&
        this.state.flower.package_id !== ""
      ) {
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

        const issues = [];

        if (soilMoisture["Sensor data"] < soilHumidity) {
          issues.push("The flower is thirsty");
        }
        if (humidity < airHumidity) {
          issues.push("Low level of humidity");
        }
        if (light < flowerLight) {
          issues.push("The flower needs more light");
        }
        if (temperature < airTemperature) {
          issues.push("The flower is cold");
        }

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
            issues={issues}
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
        <Button
          title="Edit flower"
          type="submit"
          buttonType={TYPES.EDIT}
          onClick={() => this.redirect()}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.sensors;
};

export default connect(
  mapStateToProps,
  { fetchSensors, push }
)(FlowerDetails);
