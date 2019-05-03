import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { fetchSensors } from "../../common/sensors/sensors.middleware";

import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import FlowerInfo from "./flower-info/flower-info.component";

import { backendUrl } from "../../constants/backendUrl";

import "./flower-details.styles.scss";
class FlowerDetails extends Component {
  state = {
    currentFlower: {}
  };
  componentDidMount() {
    this.props.fetchSensors();
    const flower = this.props.location.state.currentFlowerId;

    axios
      .get(`${backendUrl}/flower-id?id=${flower}`)
      .then(flower => {
        const [flower_instance] = flower.data;
        this.setState({ currentFlower: flower_instance });
      })
      .catch(err => err);
  }
  render() {
    const {
      name,
      type,
      airTemperature,
      airHumidity,
      light,
      soilHumidity
    } = this.state.currentFlower;

    console.log(soilHumidity);
    return (
      <>
        <PageTitle title="Flower details" />
        <Header />
        <FlowerInfo />
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
