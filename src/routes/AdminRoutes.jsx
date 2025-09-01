import React, { lazy } from "react";
import { Route } from "react-router-dom";

const AdminPageLayout = lazy(() => import("../layouts/Admin/AdminPageLayout"));
const AdminDashboard = lazy(() =>
  import("../pages/AdminPages/Dashboard/AdminDashboard")
);
const ActiveSalon = lazy(() =>
  import("../pages/AdminPages/Dashboard/Salon/Active/ActiveSalon")
);
const SingleSalonDetail = lazy(() =>
  import(
    "../pages/AdminPages/Dashboard/Salon/Active/SingleSalonDeatails/SingleSalonDetails"
  )
);
const ActiveSalonGallery = lazy(() =>
  import("../pages/AdminPages/Dashboard/Salon/Active/Gallary/Gallery")
);
const PendingSalon = lazy(() =>
  import("../pages/AdminPages/Dashboard/Salon/Pending/PendingSalon")
);
const PendingSalonDetail = lazy(() =>
  import(
    "../pages/AdminPages/Dashboard/Salon/Pending/SingleSalonDeatails/PendingSalonDetails"
  )
);
const PendingSalonGallery = lazy(() =>
  import("../pages/AdminPages/Dashboard/Salon/Pending/Gallary/Gallery")
);
const DeactivatedSalon = lazy(() =>
  import("../pages/AdminPages/Dashboard/Salon/Deactivated/DeactivatedSalon")
);
const PaymentPage = lazy(() =>
  import("../pages/AdminPages/Dashboard/Payment/PaymentPage")
);
const Commission = lazy(() =>
  import("../pages/AdminPages/Commissions/Commission")
);

export default function AdminRoutes() {
  return (
    <Route path="/admin" element={<AdminPageLayout />}>
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Salon Management */}
      <Route path="/admin/salon/active" element={<ActiveSalon />} />
      <Route path="/admin/salon/active/:id" element={<SingleSalonDetail />} />
      <Route
        path="/admin/salon/active/gallery/:id"
        element={<ActiveSalonGallery />}
      />

      <Route path="/admin/salon/pending" element={<PendingSalon />} />
      <Route path="/admin/salon/pending/:id" element={<PendingSalonDetail />} />
      <Route
        path="/admin/salon/pending/galley/:id"
        element={<PendingSalonGallery />}
      />

      <Route path="/admin/salon/deactivated" element={<DeactivatedSalon />} />

      {/* Payments / Commission */}
      <Route path="/admin/payment" element={<PaymentPage />} />
      <Route path="/admin/commission" element={<Commission />} />
    </Route>
  );
}
