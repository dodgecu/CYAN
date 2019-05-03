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
        <Header />
        <PageTitle title="Flower details" />

        <Diagram selector="water" title="Water chart" />
        <Diagram selector="light" title="Light chart" />
        <Diagram selector="air" title="Air humidity" />
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
