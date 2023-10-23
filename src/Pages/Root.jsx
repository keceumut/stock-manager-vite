import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Components/Login";

export default function Root() {
  const currentTheme = "light";
  return (
    <>
      <div className="">
        <div
          className={`flex justify-center ${
            currentTheme === "dark" ? "bg-secondary-900" : "bg-transparent"
          }`}
        >
          <div className="w-full lg:w-[1024px] px-2 py-6 flex items-center justify-between text-xl ">
            <Login />
            <a className="hover:text-secondary-600" href="/landing">
              Landing
            </a>
            <a className="hover:text-secondary-600" href="/products">
              Products
            </a>
            <a className="hover:text-secondary-600" href="/customers">
              Customers
            </a>
            <a className="hover:text-secondary-600" href="/sales">
              Sales
            </a>
          </div>
        </div>

        <div className="w-full lg:w-[1024px] mx-auto mt-8 pb-8 px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
