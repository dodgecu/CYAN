import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import routes from "./../../constants/routes";
import "./flower-thumbnail.scss";

function FlowerThumbnail(props) {
  const redirect = () => props.push(routes.flowerDetails, { flower: props.id });
  return (
    <div className="thumbnail">
      <div className="thumbnail--flower">
        <h2 className="thumbnail__name">{props.name}</h2>
        {props.disconnected ? (
          <>
            <i className="material-icons">warning</i>
            <span className="notconnected-message">
              There is no connection to the flower sensor!
            </span>
          </>
        ) : null}
        <i className="material-icons">{props.issues ? "warning" : null}</i>
        <p className="thumbnail__type">{props.type}</p>
      </div>
      <div className="plant--info">
        <div className="plant">
          <img
            className="plant__avatar"
            src={require(`../../assets/${props.picture}`)}
            alt="plant"
          />
        </div>
        <div className="ranges">
          <span className="ranges__title">Soil moisture</span>
          <div className="range range--soil">
            <div
              className="range--soil__fill range--fill"
              style={{ width: `${props.soilMoisture}%` }}
            />
            <span className="percentage">{props.soilMoisture}%</span>
          </div>
          <span className="ranges__title">Air humidity</span>
          <div className="range range--humidity">
            <div
              className="range--humidity__fill range--fill"
              style={{ width: `${props.airHumidity}%` }}
            />
            <span className="percentage">{props.airHumidity}%</span>
          </div>
          <span className="ranges__title">Air temperature</span>
          <div className="range range--temperature">
            <div
              className="range--temperature__fill range--fill"
              style={{ width: `${props.airTemperature}%` }}
            />
            <span className="percentage">{props.airTemperature}%</span>
          </div>
          <span className="ranges__title">Ambient light</span>
          <div className="range range--light">
            <div
              className="range--light__fill range--fill"
              style={{ width: `${props.ambientLight}%` }}
            />
            <span className="percentage">{props.ambientLight}%</span>
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
