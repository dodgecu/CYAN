import React, { Component } from "react";
//import axios from 'axios';

import FlowerForm from "./CreateFlowerForm/CreateFlowerForm";

class CreateFlower extends Component {
  submitHandler = flowerData => {
    console.log(flowerData);
    this.props.history.push(`/flower-details`);

    // axios
    //   .post(`http://192.168.0.56:4000/flower`, flowerData)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };
  render() {
    return <FlowerForm onSubmit={this.submitHandler} />;
  }
}

export default CreateFlower;
