import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { logIn } from "./logIn.action";

const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    debugger;
    this.props.logIn({ email, password });
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/testpage");
    }
  }

  render() {
    const renderField = ({
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
          {this.props.message === "Wrong password" ? (
            <div>{this.props.message}</div>
          ) : null}
          {this.props.message === "User does't exist" ? (
            <div>{this.props.message}</div>
          ) : null}
          <button type="submit" disabled={submitting}>
            Log in
          </button>
        </form>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  message: state.auth.message
});

LogIn = reduxForm({
  form: "logIn"
})(LogIn);

export default connect(
  mapStateToProps,
  { logIn }
)(LogIn);
