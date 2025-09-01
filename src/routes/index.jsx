import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import CustomerRoutes from "./CustomerRoutes";
import PartnerRoutes from "./PartnerRoutes";
import AdminRoutes from "./AdminRoutes";
import StaticRoutes from "./StaticRoutes";
import CareersRoutes from "./CareersRoutes";

const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      {CustomerRoutes()}
      {PartnerRoutes()}
      {AdminRoutes()}
      {StaticRoutes()}
      {CareersRoutes()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
