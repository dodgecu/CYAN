import React, { Component } from "react";
import { connect } from "react-redux";

import { ChartModel } from "./chart.model";
import { getDaySensorData } from "./chart.action";

import "./chart.styles.scss";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chart = new ChartModel();
  }

  fetchData(id = 1, fieldType = this.props.selector, time = 1556841600000) {
    this.props.getDaySensorData(1, fieldType, time).then(array => {
      this.chart.init({
        selector: this.props.selector,
        data: array
      });

      this.chart.draw();
      this.chart.addArea(array);
      this.chart.toolTip(array);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  pickDate() {
    const time = new Date(this.datepicker.value).getTime();
    const id = 1;
    this.chart.clear();
    this.fetchData(id, this.props.selector, time);
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
        <div className="svg-box">
          <svg className={`${this.props.selector}-chart__container`} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  water: state.chartReducer.water,
  air: state.chartReducer.air,
  temperature: state.chartReducer.temperature
});

export default connect(
  mapStateToProps,
  { getDaySensorData }
)(Chart);
