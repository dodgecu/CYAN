import React, { Component } from "react";
import * as d3 from "d3";
import dataArray from "./data";
import { Chart } from "./diagram.model";

import "./diagram.styles.scss";

export default class Diagram extends Component {
  componentDidMount() {
    const chart = new Chart({
      selector: this.props.selector
    });
    console.log(chart);
    chart.draw();
    chart.addArea(dataArray);
    chart.toolTip(dataArray);
  }

  pickDate() {
    const timestamp = new Date(this.datepicker.value).getTime();
    console.log(timestamp);
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
