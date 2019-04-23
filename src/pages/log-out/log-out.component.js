import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { logOut } from "./log-out.action";
import { Button, TYPES } from "../../common/components/button/button.component";

class LogOut extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    this.props.logOut({ email, password });
  }

  render() {
    const { submitting } = this.props;
    const margin = "logout-margin";
    return (
      <>
        <Button
          title="Log Out"
          type="submit"
          buttonType={`${TYPES.PRIMARY} ${margin}`}
          disabled={submitting}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

LogOut = reduxForm({
  form: "logOut"
})(LogOut);

export default connect(
  mapStateToProps,
  { logOut, push }
)(LogOut);
