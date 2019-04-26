import React from "react";
import Sidebar from "../navigation/navigation.component";

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
  return (
    <header className="header">
      <Sidebar links={links} />
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
};

export default Header;
