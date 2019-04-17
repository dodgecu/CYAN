import React, { Component } from "react";
import FlowerThumbnail from "./components/flower-thumbnail/flower-thumbnail";

class App extends Component {
  render() {
    return (
      <FlowerThumbnail
        id="1"
        name="Bill"
        temperature="99"
        humidity="23"
        love="50"
      />
    );
  }
}

export default App;
