import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { register } from "../authorization.action";
import { required, email, maxLength15 } from "../../../common/form-validation";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import routes from "../../../constants/routes";

class SignUp extends Component {
  onSubmit({ name, email, password }) {
    this.props.register({ name, email, password });
  }

  componentDidUpdate() {
    if (this.props.isRegistered) {
      this.props.push(routes.home);
    }
  }

  render() {
    const { handleSubmit, submitting, valid } = this.props;

    return (
      <div className="authorization authorization--sign-up">
        <i
          className="material-icons arrow-back"
          onClick={() => {
            this.props.push("/");
          }}
        >
          arrow_back
        </i>
        <h2 className="authorization__title">Sign Up</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="name"
            type="text"
            component={Input}
            label="User Name"
            validate={[required, maxLength15]}
          />
          <Field
            name="email"
            type="email"
            component={Input}
            label="Email"
            validate={[email, required]}
          />
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
            validate={required}
          />
          {this.props.message === "User already exists" ? (
            <div>{this.props.message}</div>
          ) : null}
          <Button
            title="Sign Up"
            type="submit"
            buttonType={TYPES.PRIMARY}
            disabled={!valid || submitting}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.authReducer.isRegistered,
  message: state.authReducer.message
});

SignUp = reduxForm({
  form: "signUp"
})(SignUp);

export default connect(
  mapStateToProps,
  { register, push }
)(SignUp);
