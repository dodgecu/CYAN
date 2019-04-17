import React, { Component } from "react";
import CreateFLower from "./pages/create-flower-page/create-flower.component";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

const routes = [
  {
    path: "/create-flower",
    component: CreateFLower
  }
];

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          {routes.map(route => (
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
