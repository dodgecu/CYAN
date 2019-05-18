import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import store from "../../../store";

import { updateUser } from "../authorization.action";
import "./user-profile.scss";
import Header from "../../../common/header/header.component";
import UpdateName from "./user-profile-name.component";
import UpdateEmail from "./user-profile-email.component";
import UpdatePassword from "./user-profile-password.component";
import DeleteProfile from "./user-profile-delete.component";
import PageTitle from "../../../common/page-title/page-title.component";

class UserProfile extends Component {
  onSubmit(inputValue) {
    this.props.updateUser(inputValue);
  }

  render() {
    return (
      <>
        <Header />
        <div className="authorization authorization--update">
          <PageTitle title="Dashboard" />

          <UpdateName
            initialValues={{
              name: store.getState().authReducer.user.name || "hello"
            }}
          />
          <UpdateEmail
            initialValues={{
              email: store.getState().authReducer.user.email || "hello"
            }}
          />
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
