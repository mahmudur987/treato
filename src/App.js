import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageLayout from "./layouts/PageLayout/PageLayout";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Salons from "./pages/Salons/Salons";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import SalonDetail from "./pages/SalonDetail/SalonDetail";
import BookFlow from "./pages/BookFlow/BookFlow";
import AuthChoicePage from "./pages/AuthPages/AuthChoicePage/AuthChoicePage";
import CreateAccountPage from "./pages/AuthPages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import VerifyOTP from "./pages/AuthPages/VerifyOTP/VarifyOTP";
import ForgotPassword from "./pages/AuthPages/ForgotPassword/ForgotPassword";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateUserDetails } from "./redux/slices/user";
import { fetchSalonsData } from "./utils/utils";
import Lookbook from "./pages/Lookbook/Lookbook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/AuthPages/ResetPassword/ResetPassword";
import { getUserProfile } from "./services/auth";
import LookbookDetails from "./pages/Lookbook/LookbookDetails/LookbookDetails";
import PrivateFormRoutes from "./layouts/PrivateRoutes";
import LocationAutocomplete from "./components/locations/LocationAutocomplete";

function App() {
  // Use the location hook to track route changes
  const location = useLocation();
  const [fetchUserData, setfetchUserData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [isLocationBlocked, setisLocationBlocked] = useState(false);
  const [userGeolocationAvailable, setUserGeolocationAvailable] =
    useState(true); // State to track geolocation availability
  const [userLoc, setuserLoc] = useState({});

  //Ask For Location Permission
  const askForLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // TODO: to add state,city  google map api key required
          setuserLoc({ latitude, longitude });
          dispatch(
            updateUserDetails({ latitude, longitude, isLocationAllow: true })
          );
        },
        (error) => {
          console.error("Error getting user's location:", error);
          // if blocked setting default lat and lon of Delhi
          dispatch(
            updateUserDetails({
              isLocationAllow: false,
              latitude: 28.6139, // Latitude of Delhi
              longitude: 77.209, // Longitude of Delhi
            })
          );
          setUserGeolocationAvailable(false);
          setisLocationBlocked(true);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setUserGeolocationAvailable(false);
    }
  };

  useEffect(() => {
    if (isLocationBlocked) {
      toast.info(`For a better experience, please allow location access.`);
    }
  }, [isLocationBlocked]);

  useEffect(() => {
    // Fetch user's location if not available
    if (!userDetails.latitude || !userDetails.longitude) {
      askForLocationPermission();
    }
  }, [userDetails.latitude, userDetails.longitude]);

  useEffect(() => {
    //fetching user data through jwttoken and storing in user state
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        dispatch(updateIsLoggedIn(true));
        dispatch(updateUserDetails(res?.res?.data?.data));
      });
    }
  }, []);

  // Scroll to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Call the action to fetch salon data, passing userDetails as an argument
    dispatch(fetchSalonsData(userDetails));
  }, [dispatch, userDetails]);

//TODO:testing passportJS auth. setup
useEffect(() => {
  const getUser = () => {
    fetch("https://backend.treato.in/api/v1/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        console.log("PassportJS Google Response:",resObject.user);
        // setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getUser();
}, []);


  return (
    <PageLayout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
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
          <Route path="/auth-choice" exact element={<AuthChoicePage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password/*" element={<ResetPassword />} />
        </Route>
        {/* Redirect to home for any wrong routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
