import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import "./custom-link.styles.scss";

class CustomLink extends Component {
  render() {
    return (
      <div className="link" onClick={() => this.props.push(this.props.route)}>
        {this.props.title}
      </div>
    );
  }
}

export default connect(
  null,
  { push }
)(CustomLink);
