import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SettingsSection = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  return (
    <section className="bg-coolGray-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-3 mb-3">
          <div className="w-full md:w-1/4 p-3">
            <h2 className="text-coolGray-900 text-lg font-semibold">
              Personal info
            </h2>
          </div>
          <div className="w-full md:w-3/4 p-3">
            <div className="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard">
              <div className="flex flex-wrap pb-3 -m-3">
                <div className="w-full md:w-1/2 p-3">
                  <p className="mb-1.5 font-medium text-base text-coolGray-800">
                    Name
                  </p>
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-blue-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="John"
                  />
                </div>

                <div className="w-full md:w-1/2 p-3">
                  <p className="mb-1.5 font-medium text-base text-coolGray-800">
                    Email
                  </p>
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-blue-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="johndoe@flex.co"
                  />
                </div>
                <div className="w-full md:w-1/2 p-3">
                  <p className="mb-1.5 font-medium text-base text-coolGray-800">
                    Title
                  </p>
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-blue-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="Developer"
                  />
                </div>
              </div>

              <div className="py-3">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="mb-1.5 text-sm text-coolGray-800 font-semibold">
                        Avatar
                      </p>
                      <div className="flex flex-wrap items-center -m-3">
                        <div className="w-auto p-3">
                          <img src={currentUser?.avatar} alt="" />
                        </div>
                        <div className="w-auto p-3">
                          <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-button">
                            <p>Change</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="w-full">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full p-3">
                      <button className="flex flex-wrap justify-center w-full md:w-auto md:ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 font-medium text-sm text-white border border-blue-500 rounded-md shadow-button">
                        <p>Save</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;
