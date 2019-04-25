import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  openMenuHandler() {
    this.setState({ isOpen: true });
  }

  closeMenuHandler() {
    this.setState({ isOpen: false });
  }

  render() {
    const renderOverlay = (
      <div
        className={
          this.state.isOpen ? "navigation navigation--active" : "navigation"
        }
      >
        <div className="navigation__links">
          {this.props.links.map(link => {
            return (
              <Link
                key={link.id}
                to={link.to}
                className="navigation__links--link"
                id={link.id}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
        <span
          className="navigation--close"
          onClick={this.closeMenuHandler.bind(this)}
        >
          &times;
        </span>
      </div>
    );
    return (
      <>
        <div
          className={this.state.isOpen ? "burger burger--active" : "burger"}
          onClick={this.openMenuHandler.bind(this)}
        >
          <span className="burger__icon" />
        </div>
        {renderOverlay}
      </>
    );
  }
}

export default Sidebar;
