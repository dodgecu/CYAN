import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import routes from "./../../constants/routes";
import "./flower-thumbnail.scss";
import PlantImage from "../../assets/plant-image.png";

function FlowerThumbnail(props) {
  const redirect = () => props.push(routes.flowerDetails, { flower: props.id });
  return (
    <div className="thumbnail">
      <div className="thumbnail--flower">
        <h2 className="thumbnail__name">{props.name}</h2>
        <p className="thumbnail__type">{props.type}</p>
      </div>
      <div className="plant--info">
        <div className="plant">
          <img className="plant__avatar" src={PlantImage} alt="plant" />
        </div>
        <div className="ranges">
          <span className="ranges__title">Temperature</span>
          <div className="range range--temperature">
            <div
              className="range--temperature__fill"
              style={{ width: `${props.airTemperature}%` }}
            />
            {props.airTemperature}
          </div>
          <span className="ranges__title">Humidity</span>
          <div className="range range--humidity">
            <div
              className="range--humidity__fill"
              style={{ width: `${props.airHumidity}%` }}
            />
          </div>
          {props.airHumidity}
          <span className="ranges__title">Ambient light</span>
          <div className="range range--light">
            <div
              className="range--light__fill"
              style={{ width: `${props.ambientLight}%` }}
            />
          </div>
          <span className="ranges__title">Soil humidity</span>
          <div className="range range--soil">
            <div
              className="range--soil__fill"
              style={{ width: `${props.soilHumidity}%` }}
            />
            {props.soilHumidity}
          </div>
        </div>
      </div>
      <span className="details" onClick={() => redirect()}>
        View details
      </span>
    </div>
  );
}

export default connect(
  null,
  { push }
)(FlowerThumbnail);
