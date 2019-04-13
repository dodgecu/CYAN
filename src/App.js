import React, { Component } from "react";
import { Route } from "react-router-dom";

import { TestPage } from "./pages/test-page";
import { LogIn } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import ProtectedRoute from "./protected.route";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>app component is work</h1>
        <Route exact path="/" component={LogIn} />
        <ProtectedRoute exact path="/testpage" component={TestPage} />
        <Route exact path="/signUp" component={SignUp} />
      </div>
    );
  }
}

export default App;
