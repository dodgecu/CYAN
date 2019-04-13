import React, { Component } from "react";
import Auth from "../../api/testAuth";

export default class LogIn extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            Auth.logIn(() => {
              this.props.history.push("/testpage");
            });
          }}
        >
          Log in
        </button>
      </div>
    );
  }
}
