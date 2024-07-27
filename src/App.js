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
import AboutUsPage from "./layouts/AboutUsPageLayout/AboutUsPage";
import Privacy from "./layouts/PrivacyPolicyLayout/Privacy";
import SubBar from "./components/PrivacyPolicy/PrivacyBar/SubBar";
import Termoptions from "./components/PrivacyPolicy/TermOptions/TermMenu";
import PrivacyService from "./components/PrivacyPolicy/PrivacyPolicy/PrivacyPolicy";
import FrequentlyAskedQuestionsPage from "./layouts/FrequentlyAskedQuestionsLayout/FrequentlyAskedQuestionsPage";
import PricingPage from "./layouts/PricingLayout/PricingPage";
import ContactUsLayout from "./layouts/ContactUsLayout/ContactUsLayout";
import CareersPage from "./layouts/CareersLayout/CareersPage";
import CurrentOpenings from "./pages/Careers/CurrentOpenings/CurrentOpenings";
import JobDescription from "./pages/Careers/JobDescription/JobDescription";
import JobDetails from "./pages/Careers/Details/Details";
import AppointmentCalendar from "./pages/AppointmentCalendar/AppointmentCalendar";
import PaymentPage from "./pages/AdminPages/Dashboard/Payment/PaymentPage";
import ActiveSalon from "./pages/AdminPages/Dashboard/Salon/Active/ActiveSalon";
import PendingSalon from "./pages/AdminPages/Dashboard/Salon/Pending/PendingSalon";
import DeactivatedSalon from "./pages/AdminPages/Dashboard/Salon/Deactivated/DeactivatedSalon";
import Reports from "./pages/partnerPages/Reports/Reports";
import PendingSalonDetail from "./pages/AdminPages/Dashboard/Salon/Pending/SingleSalonDeatails/PendingSalonDetails";
import SingleSalonDetail from "./pages/AdminPages/Dashboard/Salon/Active/SingleSalonDeatails/SingleSalonDetails";
import ActiveSalonGallery from "./pages/AdminPages/Dashboard/Salon/Active/Gallary/Gallery";
import PendingSalonGallery from "./pages/AdminPages/Dashboard/Salon/Pending/Gallary/Gallery";
import LookPage from "./pages/partnerPages/Look/LookPage/LookPage";
import AddLook from "./pages/partnerPages/Look/AddALook/AddLook";
import EditLook from "./pages/partnerPages/Look/EditLook/EditLook";
import Commission from "./pages/AdminPages/Commissions/Commission";
import PartnerPageLayout from "./layouts/ServicePageLayout/ServicePagelLayout";
import PersonalDetails from "./components/Services/PersonalDetails/PersonalDetails";

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
            {/* <Route  element={<Chatbot/>}/> */}
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
              <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route path="/partner/dashboard" element={<PartnerPageLayout />}>
            <Route path="/partner/dashboard" element={<Dashboard />} />
            <Route
              path="/partner/dashboard/appointment/calendar"
              element={<AppointmentCalendar />}
            />

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
              path="/partner/dashboard/personalDetails"
              element={<PersonalDetails />}
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
            {/* team management */}

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

            {/* reports */}
            <Route path="/partner/dashboard/reports" element={<Reports />} />
            {/* look */}
            <Route path="/partner/dashboard/look" element={<LookPage />} />
            <Route path="/partner/dashboard/add-look" element={<AddLook />} />
            <Route
              path="/partner/dashboard/edit-look/:id"
              element={<EditLook />}
            />
          </Route>
          {/* About page */}
          <Route path="/Aboutuspage" element={<AboutUsPage />} />
          {/* Privacy page */}
          <Route path="/Privacy" element={<Privacy />}>
            <Route path="/Privacy" element={<SubBar />}>
              <Route path="/Privacy/termofuse" element={<Termoptions />} />
              <Route path="/Privacy/policy" element={<PrivacyService />} />
            </Route>
          </Route>

          {/* Careers page routes */}
          <Route path="/careers" element={<CareersPage />}>
            <Route
              path="/careers/currentopenings"
              element={<CurrentOpenings />}
            />
            <Route
              path="/careers/jobdescription/:id"
              element={<JobDescription />}
            />
            <Route path="/careers/jobdetails/:id" element={<JobDetails />} />
          </Route>

          {/* FrequentlyAskedQuestions page  */}
          <Route
            path="/frequentlyaskedquestions"
            element={<FrequentlyAskedQuestionsPage />}
          />
          {/* Pricing page  */}
          <Route path="/Pricing" element={<PricingPage />} />
          {/* contact us page  */}
          <Route path="/contactus" element={<ContactUsLayout />} />

          {/* admin dashboard */}

          <Route path="/admin" element={<AdminPageLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/salon/active" element={<ActiveSalon />} />
            <Route
              path="/admin/salon/active/:id"
              element={<SingleSalonDetail />}
            />
            <Route
              path="/admin/salon/active/gallery/:id"
              element={<ActiveSalonGallery />}
            />
            <Route path="/admin/salon/pending" element={<PendingSalon />} />
            <Route
              path="/admin/salon/pending/:id"
              element={<PendingSalonDetail />}
            />

            <Route
              path="/admin/salon/pending/galley/:id"
              element={<PendingSalonGallery />}
            />
            <Route
              path="/admin/salon/deactivated"
              element={<DeactivatedSalon />}
            />
            <Route path="/admin/payment" element={<PaymentPage />} />
            <Route path="/admin/commission" element={<Commission />} />
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

// {
//   "email":"treatoadminsuper0707@gmail.com"fhgfgh,
//   "password":"TreatoSuperAdmin@070809"
// }
// devleor Email:mahmudur.banao@gmail.com
// password :Test@123456
// 6508592af8131fc40b478125    dont give this id on any api related to delete api for salon delete okay please
// 6508592af8131fc40b478125
//princepanchal887@gmail.com
//Brijesh@55
