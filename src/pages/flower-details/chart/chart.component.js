import React, { Component } from "react";
import { connect } from "react-redux";

import dataArray from "./data";
import { ChartModel } from "./chart.model";
import { getDaySensorData } from "./chart.action";

import "./chart.styles.scss";

class Chart extends Component {
  componentDidMount() {
    this.props.getDaySensorData(1, this.props.selector);
    debugger;
    const dataArray = this.props[this.props.selector];
    const chart = new ChartModel({
      selector: this.props.selector
    });
    chart.draw();
    chart.addArea(dataArray);
    chart.toolTip(dataArray);
  }

  pickDate() {
    const time = new Date(this.datepicker.value).getTime();
    const id = 1;
    /*     this.props.getDaySensorData(id, this.props.selector, time); */
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
  water: state.chartReducer.water || [],
  air: state.chartReducer.air || [],
  temperature: state.chartReducer.temperature || []
});

export default connect(
  mapStateToProps,
  { getDaySensorData }
)(Chart);
