import React, { Component } from "react";
import { connect } from "react-redux";

import "./spinner.styles.scss";

class Spinner extends Component {
  render() {
    return <div className="spinner" />;
  }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading
});

export default connect(
  mapStateToProps,
  null
)(Spinner);
