import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { logOut } from "./log-out.action";

class LogOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    this.props.logOut({ email, password });
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { submitting } = this.props;

    return (
      <>
        <button type="submit" disabled={submitting}>
          Log out
        </button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.logout.isAuthenticated,
  message: state.logout.message
});

LogIn = reduxForm({
  form: "logOut"
})(LogOutn);

export default connect(
  mapStateToProps,
  { logOut }
)(LogOut);
