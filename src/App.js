import React,{useEffect} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageLayout from './layouts/PageLayout/PageLayout';
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import Salons from './pages/Salons/Salons';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import SalonDetail from './pages/SalonDetail/SalonDetail';
import BookFlow from './pages/BookFlow/BookFlow';
import AuthChoicePage from "./components/AuthPages/AuthChoicePage/AuthChoicePage";
import CreateAccountPage from "./components/AuthPages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./components/AuthPages/LoginPage/LoginPage";
import VerifyOTP from "./components/AuthPages/VerifyOTP/VarifyOTP";
import ForgotPassword from "./components/AuthPages/ForgotPassword/ForgotPassword";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "./redux/slices/user";
function App() {
  // Use the location hook to track route changes
  const location = useLocation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Scroll to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  

  useEffect(() => {
    const token = sessionStorage.getItem('token')
  }, [])
 // Function to fetch user's location
 const fetchLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(updateUserDetails({ latitude, longitude }));
      },
      (error) => {
        setError(error.message);
      }
    );
  } else {
    setError("Geolocation is not available in your browser.");
  }
};

useEffect(() => {
  // Fetch the user's location when the component mounts
  fetchLocation();
}, []);

  return (
    <PageLayout>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
        <Route path='/salons' element={<Salons />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/salons/:id' element={<SalonDetail />} />
        <Route path='/salons/:id/book' element={<BookFlow/>} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/auth-choice" exact element={<AuthChoicePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/my-appointments/*" element={<MyAppointments />} />

      </Routes>
    </PageLayout>
  );
}

export default App;
