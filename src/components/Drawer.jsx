import React from "react";

const ListItem = () => (
  <li className="mb-12 flex flex-row space-x-2">
    <a
      className="font-heading font-medium text-sm text-gray-300 hover:text-white"
      href="/"
    >
      Project 1
    </a>
  </li>
);

const Drawer = () => {
  const isDrawerEnabled = false;
  const dev_borderEnabled = false;

  const showDrawer = isDrawerEnabled ? "hidden lg:flex" : "hidden";
  //looks ugly so disabled for now
  return (
    <div
      className={`${showDrawer} navbar-menu h-screen w-4/6 sm:max-w-[16rem]`}
    >
      {/* <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div> */}
      <nav className="relative z-10 px-9 py-8 bg-gray-900 h-full">
        <div className="flex flex-wrap justify-between h-full ">
          <div className="w-full ">
            <div
              className={`flex items-center justify-between -m-2 ${
                dev_borderEnabled &&
                `border-solid border-0 border-b border-gray-700`
              }`}
            >
              <div className="w-auto p-2">
                <a
                  className="inline-block text-white text-2xl font-semibold"
                  href="/"
                >
                  ilira
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center py-8 w-full">
            <ul>
              <ListItem />
              <ListItem />
              <ListItem />
              <ListItem />
            </ul>
          </div>
          <div className="flex flex-col justify-end w-full">
            <div className="flex flex-wrap">
              <div className="w-full mb-3">
                <button className="p-0.5 font-heading block w-full text-lg text-white font-medium rounded-10">
                  <div className="py-2 px-5 rounded-10">
                    <p>Login</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Drawer;
