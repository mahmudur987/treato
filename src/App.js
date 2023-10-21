import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageLayout from "./layouts/PageLayout/PageLayout";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Salons from "./pages/Salons/Salons";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import SalonDetail from "./pages/SalonDetail/SalonDetail";
import BookFlow from "./pages/BookFlow/BookFlow";
import AuthChoicePage from "./components/AuthPages/AuthChoicePage/AuthChoicePage";
import CreateAccountPage from "./components/AuthPages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./components/AuthPages/LoginPage/LoginPage";
import VerifyOTP from "./components/AuthPages/VerifyOTP/VarifyOTP";
import ForgotPassword from "./components/AuthPages/ForgotPassword/ForgotPassword";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateUserDetails } from "./redux/slices/user";
import { fetchSalonsData } from "./utils/utils";
import Lookbook from "./pages/Lookbook/Lookbook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // Use the location hook to track route changes
  const location = useLocation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [receivedOTP, setreceivedOTP] = useState(0)
  const [userGeolocationAvailable, setUserGeolocationAvailable] =
    useState(true); // State to track geolocation availability
  const [userLoc, setuserLoc] = useState({});
  // Scroll to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Call the action to fetch salon data, passing userDetails as an argument
    dispatch(fetchSalonsData(userDetails));
  }, [dispatch, userDetails]);

  useEffect(() => {
    fetchLocation();
    let userData = localStorage.getItem("userData");
    let isTokenExist = localStorage.getItem("jwtToken");
    if (userData && isTokenExist) {
      dispatch(updateIsLoggedIn(true));
      dispatch(updateUserDetails(JSON.parse(userData)));
    }
  }, []);
  const fetchLocation = () => {
    // If geolocation is not available, fall back to IP-based location
    fetchIpBasedLocation().then((ipBasedLocation) => {
      if (ipBasedLocation) {
        const { lat, lon, city, regionName } = ipBasedLocation;
        setuserLoc({ lat, lon, city, regionName });
        dispatch(
          updateUserDetails({ latitude: lat, longitude: lon, city, regionName })
        );
      } else {
        setError("Location not available.");
      }
    });
  };

  const fetchIpBasedLocation = async () => {
    try {
      const response = await fetch("http://ip-api.com/json");
      if (response.ok) {
        const data = await response.json();
        const { lat, lon, city, regionName } = data;
        return { lat, lon, city, regionName };
      } else {
        console.error(
          "IP-based location service response not okay:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching IP-based location:", error);
    }
    return null;
  };

  return (
    <PageLayout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/salons/:id" element={<SalonDetail />} />
        <Route path="/salons/:id/book" element={<BookFlow />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/auth-choice" exact element={<AuthChoicePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage setreceivedOTP={setreceivedOTP} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP receivedOTP={receivedOTP}/>} />
        <Route path="/my-appointments/*" element={<MyAppointments />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
