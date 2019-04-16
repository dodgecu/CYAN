import React, { Component } from "react";
import CreateFLower from "./CreateFlowerPage/CreateFlower";
import Aux from "./hoc/Aux/Aux";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Aux>
        <CreateFLower />
      </Aux>
    );
  }
}

export default App;
