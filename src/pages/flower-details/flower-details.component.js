import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSensors } from "../../common/sensors/sensors.middleware";

import Diagram from "./diagram/diagram.component";

import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import "./flower-details.styles.scss";
class FlowerDetails extends Component {
  componentDidMount() {
    this.props.fetchSensors();
  }
  render() {
    return (
      <>
        <h1>Flower Details</h1>;
        <Diagram
          selector="water"
          title="Water chart"
          startGradientColor="#C8D7FF"
          stopGradientColor="rgba(99, 161, 255, 0)"
          strokeColor="#6D8DFF"
          dotsColor="#235EF5"
        />
        <Diagram
          selector="light"
          title="Light chart"
          startGradientColor="#FFCA63"
          stopGradientColor="#FFFFFF"
          strokeColor="#FFCA63"
          dotsColor="#FFCA63"
        />
        <Diagram
          selector="air"
          title="Air humidity"
          startGradientColor="#AEFFEC"
          stopGradientColor="#FFFFFF"
          strokeColor="#15E9A6"
          dotsColor="#15E9A6"
        />
        <PageTitle title="Flower details" />
        <Header />
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
