import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { deleteUser, updateUser } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

class UserProfile extends Component {
  onSubmit(inputValue) {
    debugger;
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="authorization authorization--update">
        <h2 className="authorization--title">User Profile</h2>
        <div className="authorization--form">
          <form
            onSubmit={handleSubmit(value =>
              this.onSubmit({ name: value.name })
            )}
          >
            <Field
              name="name"
              type="text"
              component={Input}
              label="User Name"
            />
            <Button title="Update" type="submit" buttonType={TYPES.PRIMARY} />
          </form>

          <form
            onSubmit={handleSubmit(value =>
              this.onSubmit({ email: value.email })
            )}
          >
            <Field name="email" type="email" component={Input} label="Email" />
            <Button title="Update" type="submit" buttonType={TYPES.PRIMARY} />
          </form>

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
            />
            <Button title="Update" type="submit" buttonType={TYPES.PRIMARY} />
          </form>
        </div>
        <Button
          title="Delete account"
          onClick={() => this.props.deleteUser()}
          buttonType={TYPES.SECONDARY}
        />
      </div>
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
