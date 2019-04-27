import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import Header from "../../common/header/header.component";
import CustomLink from "./../../common/components/custom-link/custom-link.component";

import routes from "../../constants/routes";

import "./not-found.styles.scss";

function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found">
        Lorem ipsum dolor sit amet.
        <CustomLink title="Go home" route={routes.home} />
      </div>
    </>
  );
}

export default connect(
  null,
  { push }
)(NotFound);
