import React from "react";
import Sidebar from "../navigation/navigation.component";

import "./header.scss";

const Header = () => {
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
    </header>
  );
};

export default Header;
