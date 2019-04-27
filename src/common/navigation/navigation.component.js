import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import "./navigation.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  navigate(route) {
    this.props.push(route);
  }

  openMenuHandler() {
    const closed = !this.state.isOpen;
    this.setState({ isOpen: closed });
  }

  render() {
    const renderOverlay = (
      <div
        className={
          this.state.isOpen ? "navigation navigation--active" : "navigation"
        }
      >
        <ul className="navigation__links">
          {this.props.links.map(link => {
            return (
              <li
                key={link.id}
                className="navigation__links--link"
                onClick={this.navigate.bind(this, link.path)}
              >
                {link.title}
              </li>
            );
          })}
        </ul>
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
export default connect(
  null,
  { push }
)(Sidebar);
