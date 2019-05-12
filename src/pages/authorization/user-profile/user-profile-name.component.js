import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { updateUser } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import { maxLength15, required } from "../../../common/form-validation";

class UpdateName extends Component {
  onSubmit(inputValue) {
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;

    return (
      <>
        <div className="authorization--form">
          <h2 className="authorization--form__title">Personal info</h2>
          <form
            onSubmit={handleSubmit(value =>
              this.onSubmit.bind(this)({ name: value.name })
            )}
          >
            <Field
              name="name"
              type="text"
              component={Input}
              label="Username"
              validate={[maxLength15, required]}
            />
            <Button
              title="UPDATE"
              type="submit"
              buttonType={TYPES.PRIMARY}
              disabled={submitting || pristine || invalid}
            />
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UpdateName = reduxForm({
  form: "update-name"
})(UpdateName);

export default connect(
  mapStateToProps,
  { updateUser }
)(UpdateName);
