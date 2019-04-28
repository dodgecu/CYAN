import React, { Component } from "react";
import axios from "axios";

import FlowerForm from "./create-flower-form/create-flower-form.component";
import flowers from "../../constants/flowers";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import "./create-flower.scss";

class CreateFlower extends Component {
  state = {
    userId: ""
  };

  componentDidMount() {
    const lsdata = localStorage.getItem("state");
    const user = JSON.parse(lsdata);
    this.setState({ userId: user.authReducer.user.id });
  }

  submitHandler = flowerData => {
    const url = "http://localhost:4000/api/users";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`
      }
    };
    const flowerImage = flowers
      .filter(img => img.name === flowerData.flowerSelect)
      .map(img => img.flower_img);
    const [img_path] = flowerImage;
    const flowerParams = { ...flowerData, img_path: img_path };
    axios
      .post(`http://localhost:4000/flower`, flowerParams)
      .then(res => {
        axios
          .put(
            url,
            JSON.stringify({
              flowerRecord: res.data._id,
              userRecord: this.state.userId
            }),
            config
          )
          .then(result => result)
          .catch(err => error);
      })
      .catch(err => error);
  };
  render() {
    return (
      <>
        <PageTitle title="Create Flower" />
        <Header />
        <FlowerForm onSubmit={this.submitHandler} />
        <button
          onClick={() => this.props.history.push("/dashboard")}
          className="button__cancel"
          type="text"
        >
          Cancel
        </button>
      </>
    );
  }
}

export default CreateFlower;
