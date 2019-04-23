import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { required, email, maxLength15 } from "../../common/form-validation";

import { Button, TYPES } from "../../common/components/button/button.component";
import Input from "./../../common/components/input/input.component";
import "./settings.scss";
import LogOut from "../log-out/log-out.component";
import { deleteUser } from "./settings.action";

class Settings extends Component {
  render() {
    const margin = "delete-margin";
    return (
      <div className="authorization profile-settings">
        <h2 className="profile-settings__title">Profile Settings</h2>
        <form>
          <Field
            name="name"
            type="text"
            component={Input}
            label="User Name"
            validate={[required, maxLength15]}
            //value={this.state.user.name}
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
          />
          <Button title="Save" type="submit" buttonType={TYPES.PRIMARY} />
        </form>
        <Button
          title="Delete"
          type="submit"
          buttonType={`${TYPES.PRIMARY} ${margin}`}
          onClick={deleteUser}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user
});

Settings = reduxForm({
  form: "settings"
})(Settings);

export default connect(mapStateToProps)(Settings);
