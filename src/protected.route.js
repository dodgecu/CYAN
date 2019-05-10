import React from "react";
import { Route, Redirect } from "react-router-dom";

import store from "./store";

function ProtectedRouter({ protect, component: Component, ...rest }) {
  const protection = protect ? protect : store.getState().authReducer.token;

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
