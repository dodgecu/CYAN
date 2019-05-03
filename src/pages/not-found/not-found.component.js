import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import routes from "../../constants/routes";

import page404 from "../../assets/page404.png";

//COMPONENTS
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";
import CustomLink from "./../../common/components/custom-link/custom-link.component";

//STYLES
import "./not-found.styles.scss";

function NotFound() {
  return (
    <>
      <PageTitle title="Oops!" />
      <Header />
      <div className="not-found">
        <img src={page404} alt="page404" />
        <div className="not-found__description">
          Looks like this page is not exist
        </div>
        <CustomLink title="Go home" route={routes.home} />
      </div>
    </>
  );
}

export default connect(
  null,
  { push }
)(NotFound);
