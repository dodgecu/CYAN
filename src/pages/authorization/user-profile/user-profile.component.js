import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { deleteUser, updateUser } from "../authorization.action";
import "./user-profile.scss";
import Header from "../../../common/header/header.component";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";
import {
  required,
  email,
  maxLength15,
  passwordsMatch
} from "../../../common/form-validation";

class UserProfile extends Component {
  onSubmit(inputValue) {
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;

    return (
      <>
        <Header />
        <div className="authorization authorization--update">
          <h2 className="authorization--title">Account settings</h2>
          <div className="authorization--form">
            <h4>Personal info</h4>
            <form
              onSubmit={handleSubmit(value =>
                this.onSubmit({ name: value.name })
              )}
            >
              <Field
                name="name"
                type="text"
                component={Input}
                label="Username"
                validate={[maxLength15]}
              />
              <Button title="UPDATE" type="submit" buttonType={TYPES.PRIMARY} />
            </form>
          </div>
          <div className="authorization--form">
            <h2>Change email</h2>
            <form
              onSubmit={handleSubmit(value =>
                this.onSubmit({ email: value.email })
              )}
            >
              <Field
                name="email"
                type="email"
                component={Input}
                label="Email"
                validate={email}
              />
              <Button title="UPDATE" type="submit" buttonType={TYPES.PRIMARY} />
            </form>
          </div>
          <div className="authorization--form">
            <h2>Password reset</h2>
            <form
              onSubmit={handleSubmit(value =>
                this.onSubmit({ password: value.password })
              )}
            >
              <Field
                name="password"
                type="password"
                component={Input}
                label="Password"
                placeholder="Password"
              />
              <Field
                name="Repeat password"
                type="password"
                component={Input}
                label="Repeat password"
                placeholder="Repeat password"
                validate={[required, passwordsMatch]}
              />
              <Button
                title="UPDATE"
                type="submit"
                buttonType={TYPES.PRIMARY}
                disabled={submitting || pristine || invalid}
              />
            </form>
          </div>
          <div className="authorization--form">
            <h2>Delete account</h2>
            <p>
              This account will be permanently deleted. After this, you will not
              be able to restore it again.
            </p>
            <Button
              title="DELETE"
              onClick={() => this.props.deleteUser()}
              buttonType={TYPES.DELETE}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UserProfile = reduxForm({
  form: "update"
})(UserProfile);

export default connect(
  mapStateToProps,
  { updateUser, deleteUser, push }
)(UserProfile);
