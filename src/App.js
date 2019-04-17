import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Routes from "./constants/routes/routes";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          {Routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
