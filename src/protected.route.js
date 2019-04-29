import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRouter({ protect, component: Component, ...rest }) {
  protect = protect ? protect : localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={props => {
        if (protect) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default ProtectedRouter;
