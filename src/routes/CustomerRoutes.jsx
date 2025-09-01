import React, { lazy } from "react";
import { Route } from "react-router-dom";
const CustomerPageLayout = lazy(() =>
  import("../layouts/CustomarPageLayout/CustomerPageLayout")
);
const Home = lazy(() => import("../pages/Home/Home"));
const AccountSettings = lazy(() =>
  import("../pages/AccountSettings/AccountSettings")
);
const Salons = lazy(() => import("../pages/Salons/Salons"));
const SalonDetail = lazy(() => import("../pages/SalonDetail/SalonDetail"));
const BookFlow = lazy(() => import("../pages/BookFlow/BookFlow"));
const Lookbook = lazy(() => import("../pages/Lookbook/Lookbook"));
const LookbookDetails = lazy(() =>
  import("../pages/Lookbook/LookbookDetails/LookbookDetails")
);
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetail = lazy(() => import("../pages/BlogDetail/BlogDetail"));
const MyAppointments = lazy(() =>
  import("../pages/MyAppointments/MyAppointments")
);
const LocationAutocomplete = lazy(() =>
  import("../components/locations/LocationAutocomplete")
);
const PrivateFormRoutes = lazy(() => import("../layouts/PrivateRoutes"));
const AuthChoicePage = lazy(() =>
  import("../pages/AuthPages/AuthChoicePage/AuthChoicePage")
);
const CreateAccountPage = lazy(() =>
  import("../pages/AuthPages/CreateAccountPage/CreateAccountPage")
);
const LoginPage = lazy(() => import("../pages/AuthPages/LoginPage/LoginPage"));
const ForgotPassword = lazy(() =>
  import("../pages/AuthPages/ForgotPassword/ForgotPassword")
);
const VerifyOTP = lazy(() => import("../pages/AuthPages/VerifyOTP/VarifyOTP"));
const ResetPassword = lazy(() =>
  import("../pages/AuthPages/ResetPassword/ResetPassword")
);

export default function CustomerRoutes() {
  return (
    <Route element={<CustomerPageLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/salons" element={<Salons />} />
      <Route path="/salons/:id" element={<SalonDetail />} />
      <Route path="/salons/:id/book" element={<BookFlow />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/lookbook-details/:id" element={<LookbookDetails />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/my-appointments/*" element={<MyAppointments />} />
      <Route path="/LocationAutocomplete" element={<LocationAutocomplete />} />
      {/* Auth routes */}
      <Route element={<PrivateFormRoutes />}>
        <Route path="/auth-choice" element={<AuthChoicePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Route>
  );
}
