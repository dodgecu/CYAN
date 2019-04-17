import React, { Component } from "react";

import FlowerForm from "./create-flower-form/create-flower-form.component";

class CreateFlower extends Component {
  submitHandler = flowerData => {
    this.props.history.push(`/`);
  };
  render() {
    return <FlowerForm onSubmit={this.submitHandler} />;
  }
}

export default CreateFlower;
