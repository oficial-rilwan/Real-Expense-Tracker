import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ overflow: "hidden", height: "100vh" }} className="flex">
      <Sidebar />
      <div className="presentation">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
