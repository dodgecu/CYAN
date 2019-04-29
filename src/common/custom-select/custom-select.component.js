import React, { Component } from "react";
import "./custom-select.styles.scss";

class CustomSelect extends Component {
  state = { selectActive: false };

  closeOverlay = () => this.setState({ selectActive: false });
  openOverlay = () => this.setState({ selectActive: true });

  selectValueHandler = value => () => {
    this.setValue(value);
    this.closeOverlay();
  };

  renderSelectedHandler = () => {
    const { options, value } = this.props;
    const found = options.find(option => option.name === value);
    return found ? found.name : "Select flower type";
  };

  renderOptionsHandler = () => {
    return this.props.options.map(option => {
      const {
        id,
        name,
        flower_img,
        alt,
        defaultAirHumidity,
        defaultAirTemp,
        defaultLux,
        defaultSoilHumidity
      } = option;

      return (
        <article className="custom-select__options--option" key={id}>
          <h2 className="title" onClick={this.selectValueHandler(name)}>
            {name}
          </h2>
          <div className="custom-select__options--image">
            <img
              className="flower-image"
              src={require(`../../assets/${flower_img}`)}
              alt={alt}
            />
          </div>
          <ul className="custom-select__options--params">
            <li className="flower-param">
              Air Humidity: {defaultAirHumidity}RH
            </li>
            <li className="flower-param">Air Temperature: {defaultAirTemp}C</li>
            <li className="flower-param">Ambient Light: {defaultLux}LUX</li>
            <li className="flower-param">
              Soil Moisture: {defaultSoilHumidity}RH
            </li>
          </ul>
        </article>
      );
    });
  };

  setValue = value => {
    this.props.setFieldValue(this.props.name, value);
  };

  render() {
    const { selectActive } = this.state;
    return (
      <div className={`custom-select ${selectActive ? "open" : "closed"}`}>
        <div className="custom-select__field">
          <div
            className="custom-select__placeholder"
            onClick={selectActive ? this.closeOverlay : this.openOverlay}
          >
            {this.renderSelectedHandler()}
            <span className="custom-select__placeholder--arrow">&rarr;</span>
          </div>
        </div>
        {selectActive ? (
          <div className="custom-select__options">
            {this.renderOptionsHandler()}
          </div>
        ) : null}
        {selectActive ? (
          <div className="overlay" onClick={this.closeOverlay} />
        ) : null}
      </div>
    );
  }
}

export default CustomSelect;
