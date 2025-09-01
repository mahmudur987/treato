import React, { useEffect, Suspense, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateUserDetails } from "./redux/slices/user";
import { fetchSalonsData } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfile } from "./services/auth";
import { toast } from "react-toastify";
import LoadSpinner from "./components/LoadSpinner/LoadSpinner";
import ModalManager from "./components/_modals/ModalManager";
import AppRoutes from "./routes";
// Lazy load components
const PageLayout = React.lazy(() => import("./layouts/PageLayout/PageLayout"));

function App() {
  // Use the location hook to track route changes
  const location = useLocation();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [isLocationBlocked, setIsLocationBlocked] = useState(false);
  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(true);

  // Ask for Location Permission
  const askForLocationPermission = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update user details with the fetched location
          // console.log({ latitude, longitude, isLocationAllow: true });
          dispatch(
            updateUserDetails({
              data: { latitude, longitude, isLocationAllow: true },
            })
          );
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
          // Fallback to a default location (Delhi)
          dispatch(
            updateUserDetails({
              data: {
                isLocationAllow: false,
                latitude: null,
                longitude: null,
              },
            })
          );
          setIsGeolocationAvailable(false);
          setIsLocationBlocked(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation not supported");
      setIsGeolocationAvailable(false);
    }
  }, [dispatch]);

  // Notify user when location access is blocked
  useEffect(() => {
    if (isLocationBlocked) {
      toast.info("For a better experience, please allow location access.");
    }
  }, [isLocationBlocked]);

  // Fetch location if not already available
  useEffect(() => {
    if (!userDetails?.user?.latitude || !userDetails?.user?.longitude) {
      // console.log("askForLocationPermission");
      askForLocationPermission();
    }
  }, [
    userDetails?.user?.latitude,
    userDetails?.user?.longitude,
    askForLocationPermission,
  ]);

  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        if (res.res) {
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(res?.res?.data));
        } else if (res.err) {
          localStorage.removeItem("jwtToken");
        }
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchSalonsData(userDetails));
  }, [dispatch, userDetails]);

  return (
    <>
      <Suspense fallback={<LoadSpinner />}>
        <PageLayout>
          <ToastContainer position="top-right" autoClose={5000} theme="light" />
          <ModalManager />
          <Suspense fallback={<LoadSpinner />}>
            <AppRoutes />
          </Suspense>
        </PageLayout>
      </Suspense>
    </>
  );
}

export default App;

// {
//   "email":"jery192@gmail.com",
//   "password":"Test@123456"
// }

// {
//   "email":"treatoadminsuper0707@gmail.com"fhgfgh,
//  Super admin email id - treatoadminsuper0707@gmail.com
// pass- Test@123456
// }
// devleor Email:mahmudur.banao@gmail.com
// password :Test@123456
// 6508592af8131fc40b478125    dont give this id on any api related to delete api for salon delete okay please
// 6508592af8131fc40b478125
//princepanchal887@gmail.com
//Brijesh@55

// Harshit 9548096173
// Ashmit 9638201492
// treatoadminsuper0707@gmail.com
// pass - Test@123456
