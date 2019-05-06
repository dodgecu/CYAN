import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import FlowerForm from "./create-flower-form/create-flower-form.component";
import flowers from "../../constants/flowers";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";
import { confirm } from "../../common/confirm-popup/confirm-popup.component";
import Footer from "../../common/footer/footer.component";

import routes from "../../constants/routes";
import { backendUrl } from "../../constants/backendUrl";
import "./create-flower.scss";

import { Button } from "../../common/components/button/button.component";

class CreateFlower extends Component {
  isEditPage = () => typeof this.props.location.state !== "undefined";

  deleteFlower = () => {
    axios
      .delete(
        `${backendUrl}/flower-delete?id=${
          this.props.location.state.currentFlower._id
        }`
      )
      .then(res => this.props.history.push(routes.dashboard))
      .catch(err => err);
  };

  confirmDelete = () => {
    confirm({
      title: "Are you sure you want to delete",
      item: this.props.location.state.currentFlower.name,
      confirmRemove: () => this.deleteFlower()
    });
  };

  recordUserFlower = userRecord => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`
      }
    };
    axios
      .put(`${backendUrl}/api/users`, JSON.stringify(userRecord), config)
      .then(result => {
        setTimeout(() => {
          this.props.history.push(routes.dashboard);
        }, 1000);
      });
  };

  submitFlower = flower => {
    return axios.post(`${backendUrl}/flower`, flower);
  };

  updateFlower = updateData => {
    axios
      .put(
        `${backendUrl}/flower-update?id=${
          this.props.location.state.currentFlower._id
        }`,
        updateData
      )
      .then(res => setTimeout(() => this.props.history.goBack(), 1000))
      .catch(err => err);
  };

  submitHandler = flowerData => {
    const flowerImage = flowers
      .filter(img => img.name === flowerData.type)
      .map(img => img.flower_img);
    const [img_path] = flowerImage;

    const user = JSON.parse(localStorage.getItem("state"));
    const userId = user.authReducer.user.id;

    const flowerParams = {
      ...flowerData,
      img_path: img_path,
      user_id: userId,
      created_at: new Date().getTime()
    };

    if (!this.isEditPage()) {
      this.submitFlower(flowerParams).then(res => {
        this.recordUserFlower({
          flowerRecord: res.data._id,
          userRecord: userId
        });
      });
    } else {
      this.updateFlower(flowerData);
    }
  };

  render() {
    return (
      <>
        <Header />
        <PageTitle
          title={this.isEditPage() ? "Edit Flower" : "Create Flower"}
        />

        <FlowerForm
          currentFlower={
            this.isEditPage() ? this.props.location.state.currentFlower : null
          }
          onSubmit={this.submitHandler}
          deleteFlower={this.confirmDelete}
        />

        <Button
          onClick={() =>
            this.isEditPage()
              ? this.props.history.goBack()
              : this.props.history.push(routes.dashboard)
          }
          customClass="button__cancel"
          type="text"
          title={"Cancel"}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { push }
)(CreateFlower);
