import React, { Component } from "react";

import FlowerForm from "./create-flower-form/create-flower-form.component";
import flowers from "../../constants/flowers";

import "./create-flower.scss";

class CreateFlower extends Component {
  submitHandler = flowerData => {
    const flowerImage = flowers
      .filter(img => img.name === flowerData.flowerSelect)
      .map(img => img.flower_img);

    const [imgpth] = flowerImage;
    const general = { ...flowerData, img_path: imgpth };
  };
  render() {
    return (
      <div>
        <FlowerForm onSubmit={this.submitHandler} />
      </div>
    );
  }
}

export default CreateFlower;
