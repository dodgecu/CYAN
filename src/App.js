import React, { Component } from "react";
import CreateFLower from "./CreateFlowerPage/CreateFlower";
import Aux from "./hoc/Aux/Aux";
import "./App.scss";
import details from "./test.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

const routes = [
  {
    path: "/flower-details",
    component: details
  },
  {
    path: "/create-flower",
    component: CreateFLower
  }
];

class App extends Component {
  render() {
    return (
      <Router>
        <Aux>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Aux>
      </Router>
    );
  }
}

export default App;
