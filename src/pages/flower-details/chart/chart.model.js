import * as d3 from "d3";

export const ChartModel = function(opts) {
  this.selector = opts.selector;
};

ChartModel.prototype.draw = function() {
  this.margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  this.width = 600 - this.margin.left - this.margin.right;
  this.height = 400 - this.margin.top - this.margin.bottom;
  this.svg = d3
    .select(`.${this.selector}-chart__container`)
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
  this.createGradient();
  this.createScales();
  this.addAxes();
};

ChartModel.prototype.createGradient = function() {
  // Create gradient
  const defs = this.svg.append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", this.selector)
    .attr("x1", "0%")
    .attr("x2", "0")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%");

  gradient
    .append("stop")
    .attr("class", "stop")
    .attr("offset", "100%");
};

ChartModel.prototype.createScales = function() {
  // X scale
  this.xScale = d3
    .scaleLinear()
    .domain([1, 10])
    .range([0, this.width]);

  // Y scale
  this.yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([this.height, 0]);
};

ChartModel.prototype.addAxes = function() {
  this.svg
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, ${this.height})`)
    .call(
      d3
        .axisBottom()
        .scale(this.xScale)
        .tickSize(0)
        .tickPadding(10)
    );

  // Call the y axis in a group tag
  this.svg
    .append("g")
    .attr("class", "axis axis--y")
    .call(
      d3
        .axisLeft()
        .scale(this.yScale)
        .tickSize(-this.width)
        .ticks(6)
        .tickPadding(10)
        .tickFormat(d3.format("0"))
    )
    .select(".domain")
    .remove();
};

ChartModel.prototype.addArea = function(data) {
  this.data = data;
  const _this = this;
  // line generator
  const line = d3
    .line()
    .x(d => _this.xScale(d.day))
    .y(d => _this.yScale(d.value))
    .curve(d3.curveMonotoneX);

  // area generator
  const area = d3
    .area()
    .x((d, i) => _this.xScale(d.day))
    .y0(this.height)
    .y1(d => _this.yScale(d.value))
    .curve(d3.curveMonotoneX); //apply smoothing to the line

  // Append the path, bind the data, and call the area generator
  this.svg
    .append("path")
    .data(this.data) //bind data
    .attr("d", area(this.data)) //Calls the area generator
    .attr("fill", `url(#${this.selector})`);

  // Append the path, bind the data, and call the line generator
  this.svg
    .append("path")
    .data(this.data)
    .attr("class", `${this.selector}-chart__path`)
    .attr("stroke-width", "2")
    .attr("fill", "transparent")
    .attr("d", line(this.data));
};

ChartModel.prototype.toolTip = function(data) {
  //Apply the tooltip ability
  const _this = this; //do this because inside mousemove function can lost the context
  const focus = this.svg
    .append("g")
    .attr("class", "focus")
    .style("display", "none");

  const xLine = focus
    .append("line")
    .attr("class", "x-hover-line hover-line")
    .attr("y1", 0);

  const yLine = focus
    .append("line")
    .attr("class", "y-hover-line hover-line")
    .attr("x1", 0)
    .attr("x2", 0);

  focus
    .append("circle")
    .attr("class", "focus-circle")
    .attr("r", 7);

  this.svg.on("mouseover", () => focus.style("display", null));
  this.svg.on("mouseout", () => focus.style("display", "none"));
  this.svg.on("mousemove", mousemove);

  function mousemove() {
    const bisectData = d3.bisector(d => d.day).left;
    const x0 = _this.xScale.invert(d3.mouse(this)[0]);
    let i = bisectData(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.day > d1.day - x0 ? d1 : d0;

    focus.attr(
      "transform",
      `translate(${_this.xScale(d.day)}, ${_this.yScale(d.value)})`
    );
    xLine.attr("y2", _this.height - _this.yScale(d.value));
    yLine.attr("x1", -(_this.width - (_this.width - _this.xScale(d.day))));
  }
};
