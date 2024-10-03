import React, { useEffect, Suspense, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateUserDetails } from "./redux/slices/user";
import { fetchSalonsData } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfile } from "./services/auth";
import { toast } from "react-toastify";
import LoadSpinner from "./components/LoadSpinner/LoadSpinner";
// Lazy load components
const PageLayout = React.lazy(() => import("./layouts/PageLayout/PageLayout"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Blogs = React.lazy(() => import("./pages/Blogs/Blogs"));
const Salons = React.lazy(() => import("./pages/Salons/Salons"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail/BlogDetail"));
const AccountSettings = React.lazy(() =>
  import("./pages/AccountSettings/AccountSettings")
);
const SalonDetail = React.lazy(() => import("./pages/SalonDetail/SalonDetail"));
const BookFlow = React.lazy(() => import("./pages/BookFlow/BookFlow"));
const AuthChoicePage = React.lazy(() =>
  import("./pages/AuthPages/AuthChoicePage/AuthChoicePage")
);
const CreateAccountPage = React.lazy(() =>
  import("./pages/AuthPages/CreateAccountPage/CreateAccountPage")
);
const LoginPage = React.lazy(() =>
  import("./pages/AuthPages/LoginPage/LoginPage")
);
const VerifyOTP = React.lazy(() =>
  import("./pages/AuthPages/VerifyOTP/VarifyOTP")
);
const ForgotPassword = React.lazy(() =>
  import("./pages/AuthPages/ForgotPassword/ForgotPassword")
);
const MyAppointments = React.lazy(() =>
  import("./pages/MyAppointments/MyAppointments")
);
const Lookbook = React.lazy(() => import("./pages/Lookbook/Lookbook"));
const ResetPassword = React.lazy(() =>
  import("./pages/AuthPages/ResetPassword/ResetPassword")
);
const LookbookDetails = React.lazy(() =>
  import("./pages/Lookbook/LookbookDetails/LookbookDetails")
);
const PrivateFormRoutes = React.lazy(() => import("./layouts/PrivateRoutes"));
const LocationAutocomplete = React.lazy(() =>
  import("./components/locations/LocationAutocomplete")
);
const PartnerPage = React.lazy(() =>
  import("./layouts/PartnerPageLayout/PartnerPage")
);
const ModalManager = React.lazy(() =>
  import("./components/_modals/ModalManager")
);
const Dashboard = React.lazy(() =>
  import("./pages/partnerPages/Dashboard/Dashboard")
);
const PartnerAccountSetting = React.lazy(() =>
  import("./pages/partnerPages/SettingP/PartnerAccountSetting")
);
const PaymentProfile = React.lazy(() =>
  import("./pages/partnerPages/SettingP/PaymentProfile")
);
const Bussness = React.lazy(() =>
  import("./pages/partnerPages/Bussness/Bussness")
);
const PicturesGallery = React.lazy(() =>
  import("./pages/partnerPages/Bussness/Gallery/PicturesGallery")
);
const ServiceOffer = React.lazy(() =>
  import("./pages/partnerPages/Bussness/ServiceOffer")
);
const ServiceLocation = React.lazy(() =>
  import("./pages/partnerPages/Bussness/ServiceLocation")
);
const TeamManageMent = React.lazy(() =>
  import("./pages/partnerPages/Team/TeamData/TeamManageMent")
);
const AddMemberProfile = React.lazy(() =>
  import("./pages/partnerPages/Team/TeamData/AddTeamMember/AddMemberProfile")
);
const EditTeamData = React.lazy(() =>
  import("./pages/partnerPages/Team/TeamData/EditTeamData/EditTeamData")
);
const EmployeeSchedule = React.lazy(() =>
  import("./pages/partnerPages/Team/TeamData/EmployeeSchedule/EmployeeSchedule")
);
const ServiceCatalog = React.lazy(() =>
  import("./pages/partnerPages/Services/ServiceCatalog/ServiceCatalog")
);
const AddServices = React.lazy(() =>
  import("./pages/partnerPages/Services/AddServices/AddServices")
);
const EditService = React.lazy(() =>
  import("./pages/partnerPages/Services/EditService/EditService")
);
const AddAppoinment = React.lazy(() =>
  import("./pages/partnerPages/Services/AddAppoinment/AddAppoinment")
);
const PartnerHome = React.lazy(() =>
  import("./pages/partnerPages/PartnerHome/PartnerHome")
);
const AuthChoice = React.lazy(() =>
  import("./pages/partnerPages/Auth/AuthChoice/AuthChoice")
);
const CustomerPageLayout = React.lazy(() =>
  import("./layouts/CustomarPageLayout/CustomerPageLayout")
);
const AdminPageLayout = React.lazy(() =>
  import("./layouts/Admin/AdminPageLayout")
);
const AdminDashboard = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/AdminDashboard")
);
const AboutUsPage = React.lazy(() =>
  import("./layouts/AboutUsPageLayout/AboutUsPage")
);
const Privacy = React.lazy(() =>
  import("./layouts/PrivacyPolicyLayout/Privacy")
);
const SubBar = React.lazy(() =>
  import("./components/PrivacyPolicy/PrivacyBar/SubBar")
);
const Termoptions = React.lazy(() =>
  import("./components/PrivacyPolicy/TermOptions/TermMenu")
);
const PrivacyService = React.lazy(() =>
  import("./components/PrivacyPolicy/PrivacyPolicy/PrivacyPolicy")
);
const FrequentlyAskedQuestionsPage = React.lazy(() =>
  import(
    "./layouts/FrequentlyAskedQuestionsLayout/FrequentlyAskedQuestionsPage"
  )
);
const PricingPage = React.lazy(() =>
  import("./layouts/PricingLayout/PricingPage")
);
const ContactUsLayout = React.lazy(() =>
  import("./layouts/ContactUsLayout/ContactUsLayout")
);
const CareersPage = React.lazy(() =>
  import("./layouts/CareersLayout/CareersPage")
);
const CurrentOpenings = React.lazy(() =>
  import("./pages/Careers/CurrentOpenings/CurrentOpenings")
);
const JobDescription = React.lazy(() =>
  import("./pages/Careers/JobDescription/JobDescription")
);
const JobDetails = React.lazy(() => import("./pages/Careers/Details/Details"));
const AppointmentCalendar = React.lazy(() =>
  import("./pages/AppointmentCalendar/AppointmentCalendar")
);
const PaymentPage = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Payment/PaymentPage")
);
const ActiveSalon = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Salon/Active/ActiveSalon")
);
const PendingSalon = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Salon/Pending/PendingSalon")
);
const DeactivatedSalon = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Salon/Deactivated/DeactivatedSalon")
);
const Reports = React.lazy(() =>
  import("./pages/partnerPages/Reports/Reports")
);
const PendingSalonDetail = React.lazy(() =>
  import(
    "./pages/AdminPages/Dashboard/Salon/Pending/SingleSalonDeatails/PendingSalonDetails"
  )
);
const SingleSalonDetail = React.lazy(() =>
  import(
    "./pages/AdminPages/Dashboard/Salon/Active/SingleSalonDeatails/SingleSalonDetails"
  )
);
const ActiveSalonGallery = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Salon/Active/Gallary/Gallery")
);
const PendingSalonGallery = React.lazy(() =>
  import("./pages/AdminPages/Dashboard/Salon/Pending/Gallary/Gallery")
);
const LookPage = React.lazy(() =>
  import("./pages/partnerPages/Look/LookPage/LookPage")
);
const AddLook = React.lazy(() =>
  import("./pages/partnerPages/Look/AddALook/AddLook")
);
const EditLook = React.lazy(() =>
  import("./pages/partnerPages/Look/EditLook/EditLook")
);
const Commission = React.lazy(() =>
  import("./pages/AdminPages/Commissions/Commission")
);
const PartnerPageLayout = React.lazy(() =>
  import("./layouts/ServicePageLayout/ServicePagelLayout")
);
const PersonalDetails = React.lazy(() =>
  import("./pages/partnerPages/PersonalDetails/PersonalDetails")
);
const NewSalonSetting = React.lazy(() =>
  import("./pages/partnerPages/NewSalonSetting/NewSalonSetting")
);
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

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
      getUserProfile(isTokenExist)
        .then((res) => {
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(res?.res?.data));
        })
        .catch((err) => {
          console.log(err);
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
          <Suspense fallback={<LoadSpinner />}>
            <Routes>
              <Route element={<CustomerPageLayout />}>
                {/* <Route  element={<Chatbot/>}/> */}
                <Route path="/" element={<Home />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/salons" element={<Salons />} />
                <Route path="/salons/:id" element={<SalonDetail />} />
                <Route path="/salons/:id/book" element={<BookFlow />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route
                  path="/lookbook-details/:id"
                  element={<LookbookDetails />}
                />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/my-appointments/*" element={<MyAppointments />} />
                <Route
                  path="/LocationAutocomplete"
                  element={<LocationAutocomplete />}
                />{" "}
                {/* Auth routes */}
                <Route element={<PrivateFormRoutes />}>
                  <Route
                    path="/auth-choice"
                    exact
                    element={<AuthChoicePage />}
                  />
                  <Route
                    path="/create-account"
                    element={<CreateAccountPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
              </Route>
              {/* Redirect to home for any wrong routes */}
              <Route path="*" element={<NotFound />} />
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
                  path="/partner/dashboard/newSalonSetting"
                  element={<NewSalonSetting />}
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

                {/* add appointment */}

                <Route
                  path="/partner/dashboard/addappoinment"
                  element={<AddAppoinment />}
                />
                {/* partner accountSetting */}
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
                <Route
                  path="/partner/dashboard/reports"
                  element={<Reports />}
                />
                {/* look */}
                <Route path="/partner/dashboard/look" element={<LookPage />} />
                <Route
                  path="/partner/dashboard/add-look"
                  element={<AddLook />}
                />
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
                <Route
                  path="/careers/jobdetails/:id"
                  element={<JobDetails />}
                />
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
//   "password":"TreatoSuperAdmin@070809"
// }
// devleor Email:mahmudur.banao@gmail.com
// password :Test@123456
// 6508592af8131fc40b478125    dont give this id on any api related to delete api for salon delete okay please
// 6508592af8131fc40b478125
//princepanchal887@gmail.com
//Brijesh@55

// Harshit 9548096173
// Ashmit 9638201492
