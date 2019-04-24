import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { deleteUser, updateUser } from "../authorization.action";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

class Test extends Component {
  onSubmit(inputValue) {
    debugger;
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="authorization authorization--sign-up">
        <form
          onSubmit={handleSubmit(value => this.onSubmit({ name: value.name }))}
        >
          <Field name="name" type="text" component={Input} label="User Name" />
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
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

Test = reduxForm({
  form: "update"
})(Test);

export default connect(
  mapStateToProps,
  { updateUser, deleteUser, push }
)(Test);
