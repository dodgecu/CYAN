import React, { Component } from "react";
import axios from "axios";

import FlowerForm from "./create-flower-form/create-flower-form.component";
import flowers from "../../constants/flowers";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";
import Footer from "../../common/footer/footer.component";

import routes from "../../constants/routes";
import { backendUrl } from "../../constants/backendUrl";
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
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`
      }
    };
    const flowerImage = flowers
      .filter(img => img.name === flowerData.type)
      .map(img => img.flower_img);
    const [img_path] = flowerImage;
    const flowerParams = {
      ...flowerData,
      img_path: img_path,
      user_id: this.state.userId
    };
    axios
      .post(`${backendUrl}/flower`, flowerParams)
      .then(res => {
        axios
          .put(
            `${backendUrl}/api/users`,
            JSON.stringify({
              flowerRecord: res.data._id,
              userRecord: this.state.userId
            }),
            config
          )
          .then(result => {
            setTimeout(() => {
              this.props.history.push(routes.dashboard);
            }, 1000);
          })
          .catch(error => error);
      })
      .catch(err => err);
  };
  render() {
    return (
      <>
        <PageTitle title="Create Flower" />
        <Header />
        <FlowerForm onSubmit={this.submitHandler} />
        <button
          onClick={() => this.props.history.push(routes.dashboard)}
          className="button__cancel"
          type="text"
        >
          Cancel
        </button>
        <Footer />
      </>
    );
  }
}

export default CreateFlower;
