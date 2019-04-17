import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Routes from "./constants/routes/routes";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          {Routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </>
      </Router>
    );
  }
}

export default App;
