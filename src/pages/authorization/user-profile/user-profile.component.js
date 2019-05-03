import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { updateUser, logIn } from "../authorization.action";
import "./user-profile.scss";
import Header from "../../../common/header/header.component";
import UpdateName from "./user-profile-name.component";
import UpdateEmail from "./user-profile-email.component";
import UpdatePassword from "./user-profile-password.component";
import DeleteProfile from "./user-profile-delete.component";

class UserProfile extends Component {
  onSubmit(inputValue) {
    this.props.updateUser(inputValue);
  }

  render() {
    return (
      <>
        <Header />
        <div className="authorization authorization--update">
          <h1>Account settings</h1>
          <UpdateName />
          <UpdateEmail />
          <UpdatePassword />
          <DeleteProfile />
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
  { updateUser }
)(UserProfile);
