import React from "react";
import Sidebar from "../navigation/navigation.component";
import { withRouter } from "react-router";

import routes from "../../constants/routes";

import "./header.scss";

const Header = props => {
  const links = [
    {
      title: "Dashboard",
      path: "/dashboard",
      id: "dashboard"
    },
    {
      title: "Create Flower",
      path: "/create-flower",
      id: "create-flower"
    }
  ];
  const { pathname } = props.history.location;
  return (
    <header className="header">
      {pathname === "/" ||
      pathname === routes.logIn ||
      pathname === routes.signUp ? null : (
        <Sidebar links={links} />
      )}
    </header>
  );
};

export default withRouter(Header);
