import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { updateUser, clearMessage } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import { email, requireEmail } from "./user-profile.validation";

class UpdateEmail extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    if (nextProps.errors) {
      that.setState({ errors: true });
    }
  }
  onSubmit(inputValue) {
    this.props.clearMessage();
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <div className="authorization--form">
        <h2 className="authorization--form__title">Change email</h2>
        <form
          onSubmit={handleSubmit(value =>
            this.onSubmit.bind(this)({ email: value.email })
          )}
        >
          <Field
            name="email"
            type="email"
            component={Input}
            label="Email"
            validate={[email, requireEmail]}
          />
          <Button
            title="UPDATE"
            type="submit"
            buttonType={TYPES.PRIMARY}
            disabled={this.state.errors || submitting || invalid}
          />
          {this.props.message === "User with such email already exist" ||
          this.props.message === "Cannot change email" ? (
            <div className="error-message">{this.props.message}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UpdateEmail = reduxForm({
  form: "update-email"
})(UpdateEmail);

export default connect(
  mapStateToProps,
  { updateUser, push, clearMessage }
)(UpdateEmail);
