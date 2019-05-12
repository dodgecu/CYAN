import React from "react";

import "./chart.styles.scss";

function NoDataChart(props) {
  return (
    <div className={`error-chart error-chart--${props.selector}`}>
      <h2 className="error-chart__title">
        WARNING! There is no statistic about flower on this day
      </h2>
    </div>
  );
}

export default NoDataChart;
