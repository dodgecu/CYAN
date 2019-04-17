import React from "react";
import "./flower-thumbnail.scss";
import PlantImage from "../../assets/plant-image.png";

function FlowerThumbnail(props) {
  return (
    <>
      <header className="header">
        <h1 className="header__text">{props.name}</h1>
      </header>
      <div className="plant">
        <img className="plant__avatar" src={PlantImage} alt="plant" />
      </div>
      <div className="ranges">
        <span>Temperature</span>
        <input
          className="range range--temperature"
          type="range"
          min="0"
          max="100"
          value={props.temperature}
          readOnly
        />
        <span>Humidity</span>
        <input
          className="range range--humidity"
          type="range"
          min="0"
          max="100"
          value={props.humidity}
          readOnly
        />
        <span>Light</span>
        <input
          className="range range--light"
          type="range"
          min="0"
          max="23"
          readOnly
          value={props.light}
        />
        <span>Air</span>
        <input
          className="range range--air"
          type="range"
          min="0"
          max="56"
          readOnly
          value={props.air}
        />
      </div>
      <footer className="thumbnail__footer">
        <button className="btn">
          <a className="btn__details" href={`/details/${props.id}`}>
            Details
          </a>
        </button>
      </footer>
    </>
  );
}

export default FlowerThumbnail;
