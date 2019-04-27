import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Header from "../../../common/header/header.component";

import routes from "../../../constants/routes";

function SignUpSuccess() {
  return (
    <>
      <Header />
      <div className="sign-up-success">
        <h2 className="sign-up-success__title">Success!</h2>
        <div className="sign-up-success__description">
          <div>
            Your account has been successfully created. Now you are able to
            login in the app.
          </div>
          <div
            className="link sign-up-success--link"
            onClick={() => {
              this.props.push(routes.logIn);
            }}
          >
            Go to login page
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(
  null,
  { push }
)(SignUpSuccess);
