import React from "react";
import Drawer from "./Drawer";
import TopNav from "./TopNav";

const Layout = ({ children }) => {
  return (
    <section className="overflow-hidden">
      <div className="flex flex-row ">
        <Drawer />
        <div className="w-screen bg-gray-50">
          <TopNav />
          <div className="pt-[4rem]">{children}</div>
        </div>
        {/* {children || null} */}
      </div>
    </section>
  );
};

export default Layout;
