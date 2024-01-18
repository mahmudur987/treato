import React from "react";
import style from "./ServicePage.module.css";
import { Outlet } from "react-router-dom";

const ServicePage = () => {
  return (
    <div className={style.container}>
      <div>L</div>
      <div>
        <h6>navbar</h6>
        <Outlet />
      </div>
    </div>
  );
};

export default ServicePage;
