import React from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

const Layout = ({ children, title, name }) => {
  return (
    <div className="appContainer">
      <Navigation name={name} />
      <div className="contentsRight">
        <Header title={title} />
        <div className="pageContents">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
