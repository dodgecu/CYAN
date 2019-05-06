import React from "react";
import Sidebar from "../navigation/navigation.component";
import { withRouter } from "react-router";

import LogOut from "../../pages/authorization/log-out/log-out.component";

import routes from "../../constants/routes";

import "./header.scss";

const Header = props => {
  const links = [
    {
      title: "Dashboard",
      path: routes.dashboard,
      id: "dashboard",
      className: ""
    },
    {
      title: "Create flower",
      path: routes.createFlower,
      id: "create-flower",
      className: ""
    },
    {
      title: "Account settings",
      path: routes.userProfile,
      id: "user-profile",
      className: "static"
    },
    {
      title: <LogOut />,
      path: "/",
      id: "log-out",
      className: "logout"
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
