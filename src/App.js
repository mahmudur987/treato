import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Salons from "./pages/Salons/Salons";
import AuthChoicePage from "./components/AuthPages/AuthChoicePage/AuthChoicePage";
import CreateAccountPage from "./components/AuthPages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./components/AuthPages/LoginPage/LoginPage";
import VerifyOTP from "./components/AuthPages/VerifyOTP/VarifyOTP";
import ForgotPassword from "./components/AuthPages/ForgotPassword/ForgotPassword";
import PageLayout from "./layouts/PageLayout/PageLayout";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import MyAppointments from "./pages/MyAppointments/MyAppointments";

function App() {
  // Use the location hook to track route changes
  const location = useLocation();

  // Scroll to the top when the route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/auth-choice" exact element={<AuthChoicePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/my-appointments/*" element={<MyAppointments />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
