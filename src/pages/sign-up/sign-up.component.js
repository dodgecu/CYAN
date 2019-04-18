import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { register } from "./sign-up.action";
import { required, email, maxLength15 } from "../../common/form-validation";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ name, email, password }) {
    this.props.register({ name, email, password });
  }

  render() {
    const renderField = ({
      // need create common input for all
      input,
      label,
      type,
      meta: { touched, error, warning }
    }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );

    const { handleSubmit, submitting } = this.props;

    return (
      <>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            type="text"
            component={renderField}
            label="User Name"
            validate={[required, maxLength15]}
          />
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
            validate={email}
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
            validate={required}
          />
          {this.props.message === "User already exists" ? (
            <div>{this.props.message}</div>
          ) : null}
          <button type="submit" disabled={submitting}>
            Sign up
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.signup.isRegistered,
  message: state.signup.message
});

SignUp = reduxForm({
  form: "signUp"
})(SignUp);

export default connect(
  mapStateToProps,
  { register }
)(SignUp);
