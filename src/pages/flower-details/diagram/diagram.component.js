import React, { Component } from "react";
import * as d3 from "d3";
import dataArray from "./data";

import "./diagram.styles.scss";

export default class Diagram extends Component {
  componentDidMount() {
    //margin convention practice
    const selector = this.props.selector;
    const margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };

    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const strokeColor = this.props.strokeColor;
    const dotsColor = this.props.dotsColor;

    const gradientColor = {
      start: this.props.startGradientColor,
      stop: this.props.stopGradientColor
    };

    const formatInteger = d3.format("0");
    const bisectData = d3.bisector(d => d.day).left;

    // data
    const data = dataArray;

    //the number of datapoints
    const n = data.length;

    // X scale
    const xScale = d3
      .scaleLinear()
      .domain([1, n])
      .range([0, width]);

    // Y scale
    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    // line generator
    const line = d3
      .line()
      .x(d => xScale(d.day))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // area generator
    const area = d3
      .area()
      .x((d, i) => xScale(d.day))
      .y0(height)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX); //apply smoothing to the line

    const svg = d3
      .select(`.${selector}-chart__container`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create gradient
    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", selector)
      .attr("x1", "0%")
      .attr("x2", "0")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", gradientColor.start);

    gradient
      .append("stop")
      .attr("class", "stop")
      .attr("offset", "100%")
      .attr("stop-color", gradientColor.stop);

    // Append the path, bind the data, and call the area generator
    svg
      .append("path")
      .data(data) //bind data
      .attr("d", area(data)) //Calls the area generator
      .attr("fill", `url(#${selector})`);

    // Append the path, bind the data, and call the line generator
    svg
      .append("path")
      .data(data)
      .attr("stroke-width", "2")
      .attr("stroke", strokeColor)
      .attr("fill", "transparent")
      .attr("d", line(data));

    // Call the x axis in a group tag
    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickSize(0)
          .tickPadding(10)
      );

    // Call the y axis in a group tag
    svg
      .append("g")
      .attr("class", "axis axis--y")
      .call(
        d3
          .axisLeft()
          .scale(yScale)
          .tickSize(-width)
          .ticks(6)
          .tickPadding(10)
          .tickFormat(formatInteger)
      )
      .select(".domain")
      .remove();

    svg.selectAll(".tick line").attr("stroke", "#979EA6");

    //Apply the tooltip ability
    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    const xLine = focus
      .append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("stroke", strokeColor)
      .attr("y1", 0);

    const yLine = focus
      .append("line")
      .attr("class", "y-hover-line hover-line")
      .attr("stroke", strokeColor)
      .attr("x1", 0)
      .attr("x2", 0);

    focus
      .append("circle")
      .attr("fill", dotsColor)
      .attr("r", 7);

    svg.on("mouseover", () => focus.style("display", null));
    svg.on("mouseout", () => focus.style("display", "none"));
    svg.on("mousemove", mousemove);

    function mousemove() {
      const x0 = xScale.invert(d3.mouse(this)[0]);
      let i = bisectData(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      console.log(d0, d1, i);
      const d = x0 - d0.day > d1.day - x0 ? d1 : d0;

      focus.attr(
        "transform",
        `translate(${xScale(d.day)}, ${yScale(d.value)})`
      );
      xLine.attr("y2", height - yScale(d.value));
      yLine.attr("x1", -(width - (width - xScale(d.day))));
    }
  }

  render() {
    return (
      <div className="chart">
        <h2 className="chart__title">{this.props.title}</h2>
        <svg className={`${this.props.selector}-chart__container`} />
      </div>
    );
  }
}
