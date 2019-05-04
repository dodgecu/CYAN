import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import dataArray from "./data";
import { ChartModel } from "./chart.model";
import { getDaySensorData } from "./chart.action";

import "./chart.styles.scss";

class Chart extends Component {
  componentDidMount() {
    const chart = new ChartModel({
      selector: this.props.selector
    });
    chart.draw();
    chart.addArea(dataArray);
    chart.toolTip(dataArray);
    for (let i = 0; i < 5; i++) {
      console.log(this.props.data[i].time);
    }
    const start = moment(this.props.data[0].time).format("DD MMM YYYY hh:mm a");
    const end = moment(this.props.data[2000].time).format(
      "DD MMM YYYY hh:mm a"
    );
    debugger;
    console.log(end);
    const diff = end.diff(start);
    console.log(diff);
    const diffDuration = moment.duration(diff);

    console.log(diffDuration.hours());
  }

  pickDate() {
    const time = new Date(this.datepicker.value).getTime();
    const id = 1;
    this.props.getDaySensorData({ id, time });
  }

  render() {
    return (
      <div className={`${this.props.selector}-chart`}>
        <button onClick={this.pickDate.bind(this)}>get date</button>
        <input
          ref={node => (this.datepicker = node)}
          type="date"
          name="date"
          id="date"
        />
        <h2 className={`${this.props.selector}-chart__title`}>
          {this.props.title}
        </h2>
        <svg className={`${this.props.selector}-chart__container`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.chartReducer.sensorData
});

export default connect(
  mapStateToProps,
  { getDaySensorData }
)(Chart);
