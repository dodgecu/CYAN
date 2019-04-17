import React, { Component } from "react";
import { Route } from "react-router-dom";

import Routes from "./constants/routes/routes";
import ProtectedRoute from "./protected.route";

import "./App.scss";
class App extends Component {
  render() {
    return (
      <>
        {Routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
        <ProtectedRoute exact path="/testpage" />
      </>
    );
  }
}

export default App;
