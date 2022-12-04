import React from "react";
import Drawer from "./Drawer";
import TopNav from "./TopNav";

const Layout = ({ children }) => {
  return (
    <section className="h-[100%] bg-gray-100">
      <div className="flex flex-row">
        <Drawer />
        <div className="w-screen">
          <TopNav />
          <div className="pt-[4rem] min-h-screen xl:px-[11rem]">{children}</div>
        </div>
        {/* {children || null} */}
      </div>
    </section>
  );
};

export default Layout;
