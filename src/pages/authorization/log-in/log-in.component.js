import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { logIn } from "../authorization.action";
import { required, email } from "../../../common/form-validation";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";
import Header from "../../../common/header/header.component";
import CustomLink from "../../../common/components/custom-link/custom-link.component";

import routes from "../../../constants/routes";

import "./log-in.styles.scss";

class LogIn extends Component {
  onSubmit({ email, password }) {
    this.props.logIn({ email, password });
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.push(routes.dashboard);
    }
  }

  render() {
    const { handleSubmit, submitting, valid } = this.props;

    return (
      <>
        <Header />
        <div className="authorization authorization--log-in">
          <h2 className="authorization__title">Login to Cyander</h2>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name="email"
              type="email"
              component={Input}
              label="Email address"
              placeholder="Email"
              validate={[email, required]}
            />
            <Field
              name="password"
              type="password"
              component={Input}
              label="Password"
              placeholder="Password"
              validate={required}
            />
            {this.props.message === "Wrong password" ? (
              <div>{this.props.message}</div>
            ) : null}
            {this.props.message === "User does't exist" ? (
              <div>{this.props.message}</div>
            ) : null}

            <Button
              title="SIGN IN"
              type="submit"
              buttonType={TYPES.PRIMARY}
              disabled={!valid || submitting}
            />
          </form>
          <div className="authorization__helper">
            <span>New to Cyander?</span>
            <CustomLink
              additionalClass="link--log-in"
              title="Sign up"
              route={routes.signUp}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  message: state.authReducer.message
});

LogIn = reduxForm({
  form: "logIn"
})(LogIn);

export default connect(
  mapStateToProps,
  { logIn, push }
)(LogIn);
