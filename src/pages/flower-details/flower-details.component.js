import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import axios from "axios";

import { fetchSensors } from "../../common/sensors/sensors.middleware";
import { backendUrl } from "../../constants/backendUrl";
import routes from "../../constants/routes";
import {
  fetchDataFromSensors,
  validIncomingObj
} from "./flower-details-sensor.validate";

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
          //this.flower = current_flower
        })
        .catch(err => err);
      this.props.fetchSensors();
    } else {
      this.props.history.push(routes.dashboard);
    }
  }

  redirect = () =>
    this.props.push(routes.edit, {
      currentFlower: this.state.flower
    });

  render() {
    const liveData = fetchDataFromSensors(
      this.props.sensors,
      this.state.flower
    );
    const issues = [];
    let flowerInfo;

    if (validIncomingObj(liveData.currentFlower)) {
      const {
        connected,
        sensorHumidity,
        sensorLight,
        sensorTemperature,
        sensorSoilmoisture,
        currentFlower: {
          name,
          type,
          airTemperature,
          airHumidity,
          light,
          soilHumidity,
          created_at,
          delta,
          img_path
        }
      } = liveData;

      if (sensorSoilmoisture + delta < soilHumidity) {
        issues.push("The flower is thirsty");
      }
      if (sensorHumidity + delta < airHumidity) {
        issues.push("Low level of humidity");
      }
      if (sensorLight + delta < light) {
        issues.push("The flower needs more light");
      }
      if (sensorTemperature + delta < airTemperature) {
        issues.push("The flower is cold");
      }

      flowerInfo = (
        <FLowerInfo
          flowerName={name}
          thumb={img_path}
          type={type}
          soil={sensorSoilmoisture === null ? 0 : sensorSoilmoisture}
          temperature={sensorTemperature === null ? 0 : sensorTemperature}
          humidity={sensorHumidity === null ? 0 : sensorHumidity}
          light={sensorLight === null ? 0 : sensorLight}
          created_at={created_at}
          connected={connected ? true : false}
          issues={connected ? issues : []}
        />
      );
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
        {console.log(this.props)}
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
