import React from "react";
import { Route, Redirect } from "react-router-dom";

import Auth from "./api/testAuth";

export default function ProtectedRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
}
