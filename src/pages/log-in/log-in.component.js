import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { logIn } from "./log-in.action";
import { required, email } from "../../common/form-validation";
import { Button, TYPES } from "../../common/components/button/button.component";

import routes from "../../constants/routes";

import "./log-in.styles.scss";

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
    this.props.logIn({ email, password });
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.push(routes.createFlower);
    }
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

    const { handleSubmit, submitting, valid } = this.props;

    return (
      <div className="log-in">
        <div className="log-in__img-container">
          <img
            className="log-in-img"
            src="../../../assets/img/arrow-left.svg"
            alt="arrow-left"
          />
        </div>
        <h2 className="log-in__title">Log In</h2>
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

          <Button
            title="Log In"
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
  isAuthenticated: state.login.isAuthenticated,
  message: state.login.message
});

LogIn = reduxForm({
  form: "logIn"
})(LogIn);

export default connect(
  mapStateToProps,
  { logIn, push }
)(LogIn);
