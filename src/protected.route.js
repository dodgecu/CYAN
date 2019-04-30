import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRouter({ protect, component: Component, ...rest }) {
  const protection = protect ? protect : localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={props => {
        if (protection) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default ProtectedRouter;
