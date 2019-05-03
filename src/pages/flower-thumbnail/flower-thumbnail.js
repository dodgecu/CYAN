import React from "react";
import "./flower-thumbnail.scss";
import PlantImage from "../../assets/plant-image.png";

function FlowerThumbnail(props) {
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
            <span className="percentage">{props.airTemperature}</span>
          </div>
          <span className="ranges__title">Humidity</span>
          <div className="range range--humidity">
            <div
              className="range--humidity__fill"
              style={{ width: `${props.airHumidity}%` }}
            />

            <span className="percentage">{props.airHumidity}</span>
          </div>
          <span className="ranges__title">Ambient light</span>
          <div className="range range--light">
            <div
              className="range--light__fill"
              style={{ width: `${props.ambientLight}%` }}
            />
            <span className="percentage">{props.ambientLight}</span>
          </div>
          <span className="ranges__title">Soil humidity</span>
          <div className="range range--soil">
            <div
              className="range--soil__fill"
              style={{ width: `${props.soilHumidity}%` }}
            />
            <span className="percentage">{props.soilHumidity}</span>
          </div>
        </div>
      </div>
      <a className="details" href={`/flower-details/${props.id}`}>
        View details
      </a>
    </div>
  );
}

export default FlowerThumbnail;
