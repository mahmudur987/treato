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
import PartnerPage from "./layouts/PartnerPageLayout/PartnerPage";
import ServicePage from "./layouts/ServicePageLayout/ServicePagelLayout";
import ModalManager from "./components/_modals/ModalManager";
import Dashboard from "./pages/partnerPages/Dashboard/Dashboard";
import PartnerAccountSetting from "./pages/partnerPages/SettingP/PartnerAccountSetting";
import PaymentProfile from "./pages/partnerPages/SettingP/PaymentProfile";
import Bussness from "./pages/partnerPages/Bussness/Bussness";
import PicturesGallery from "./pages/partnerPages/Bussness/Gallery/PicturesGallery";
import ServiceOffer from "./pages/partnerPages/Bussness/ServiceOffer";
import ServiceLocation from "./pages/partnerPages/Bussness/ServiceLocation";
import TeamManageMent from "./pages/partnerPages/Team/TeamData/TeamManageMent";
import AddMemberProfile from "./pages/partnerPages/Team/TeamData/AddTeamMember/AddMemberProfile";
import EditTeamData from "./pages/partnerPages/Team/TeamData/EditTeamData/EditTeamData";
import EmployeeSchedule from "./pages/partnerPages/Team/TeamData/EmployeeSchedule/EmployeeSchedule";
import ServiceCatalog from "./pages/partnerPages/Services/ServiceCatalog/ServiceCatalog";
import AddServices from "./pages/partnerPages/Services/AddServices/AddServices";
import EditService from "./pages/partnerPages/Services/EditService/EditService";
import AddAppoinment from "./pages/partnerPages/Services/AddAppoinment/AddAppoinment";
import PartnerHome from "./pages/partnerPages/PartnerHome/PartnerHome";
import AuthChoice from "./pages/partnerPages/Auth/AuthChoice/AuthChoice";
import CustomerPageLayout from "./layouts/CustomarPageLayout/CustomerPageLayout";
import AdminPageLayout from "./layouts/Admin/AdminPageLayout";
import AdminDashboard from "./pages/AdminPages/Dashboard/AdminDashboard";
import Reports from "./pages/AdminPages/Reports/Reports";

function App() {
  // Use the location hook to track route changes
  const location = useLocation();

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
              latitude: 28.6139,
              longitude: 77.209,
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
    if (!userDetails.latitude || !userDetails.longitude) {
      askForLocationPermission();
    }
  }, [userDetails.latitude, userDetails.longitude]);

  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        dispatch(updateIsLoggedIn(true));
        dispatch(updateUserDetails(res?.res?.data?.data));
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
        <ModalManager />
        <Routes>
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
            <Route
              path="/LocationAutocomplete"
              element={<LocationAutocomplete />}
            />{" "}
            {/* Auth routes */}
            <Route element={<PrivateFormRoutes />}>
              <Route path="/auth-choice" exact element={<AuthChoicePage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password/*" element={<ResetPassword />} />
            </Route>
          </Route>
          {/* Redirect to home for any wrong routes */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/partner" element={<PartnerPage />}>
            <Route path="/partner" element={<PartnerHome />} />
            <Route path="/partner/authchoice" element={<AuthChoice />} />
            <Route path="/partner/login" element={<LoginPage />} />
          </Route>
          {/* partner dashboard */}
          <Route path="/partner/dashboard" element={<ServicePage />}>
            <Route path="/partner/dashboard" element={<Dashboard />} />

            <Route
              path="/partner/dashboard/service"
              element={<ServiceCatalog />}
            />
            <Route
              path="/partner/dashboard/service/addservice"
              element={<AddServices />}
            />
            <Route
              path="/partner/dashboard/service/editservice"
              element={<EditService />}
            />

            {/* add appoinment */}

            <Route
              path="/partner/dashboard/addappoinment"
              element={<AddAppoinment />}
            />
            {/* partner accountsetting */}
            <Route
              path="/partner/dashboard/PartnerAccountSetting"
              element={<PartnerAccountSetting />}
            />
            <Route
              path="/partner/dashboard/serviceBussness"
              element={<Bussness />}
            />
            <Route
              path="/partner/dashboard/PaymentProfile"
              element={<PaymentProfile />}
            />
            <Route
              path="/partner/dashboard/storetime"
              element={<ServiceOffer />}
            />
            <Route
              path="/partner/dashboard/location"
              element={<ServiceLocation />}
            />
            <Route
              path="/partner/dashboard/PicturesGallery"
              element={<PicturesGallery />}
            />
            {/* team manage ment */}

            <Route
              path="/partner/dashboard/TeamManageMent"
              element={<TeamManageMent />}
            />
            <Route
              path="/partner/dashboard/AddMemberProfile"
              element={<AddMemberProfile />}
            />
            <Route
              path="/partner/dashboard/EditMemberProfile/:id"
              element={<EditTeamData />}
            />
            <Route
              path="/partner/dashboard/EmployeeSchedule"
              element={<EmployeeSchedule />}
            />
          </Route>

          {/* admin dashboard */}

          <Route path="/admin" element={<AdminPageLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;

// {
//   "email":"jery192@gmail.com",
//   "password":"Test@123456"
// }
