import React, { lazy } from "react";
import { Route } from "react-router-dom";

const PartnerPage = lazy(() =>
  import("../layouts/PartnerPageLayout/PartnerPage")
);
const PartnerHome = lazy(() =>
  import("../pages/partnerPages/PartnerHome/PartnerHome")
);
const AuthChoice = lazy(() =>
  import("../pages/partnerPages/Auth/AuthChoice/AuthChoice")
);
const LoginPage = lazy(() => import("../pages/AuthPages/LoginPage/LoginPage"));

const PartnerPageLayout = lazy(() =>
  import("../layouts/ServicePageLayout/ServicePagelLayout")
);
const Dashboard = lazy(() =>
  import("../pages/partnerPages/Dashboard/Dashboard")
);
const NewSalonSetting = lazy(() =>
  import("../pages/partnerPages/NewSalonSetting/NewSalonSetting")
);
const AppointmentCalendar = lazy(() =>
  import("../pages/AppointmentCalendar/AppointmentCalendar")
);
const ServiceCatalog = lazy(() =>
  import("../pages/partnerPages/Services/ServiceCatalog/ServiceCatalog")
);
const AddServices = lazy(() =>
  import("../pages/partnerPages/Services/AddServices/AddServices")
);
const EditService = lazy(() =>
  import("../pages/partnerPages/Services/EditService/EditService")
);
const AddAppoinment = lazy(() =>
  import("../pages/partnerPages/Services/AddAppoinment/AddAppoinment")
);
const PartnerAccountSetting = lazy(() =>
  import("../pages/partnerPages/SettingP/PartnerAccountSetting")
);
const PaymentProfile = lazy(() =>
  import("../pages/partnerPages/SettingP/PaymentProfile")
);
const Bussness = lazy(() => import("../pages/partnerPages/Bussness/Bussness"));
const ServiceOffer = lazy(() =>
  import("../pages/partnerPages/Bussness/ServiceOffer")
);
const ServiceLocation = lazy(() =>
  import("../pages/partnerPages/Bussness/ServiceLocation")
);
const PicturesGallery = lazy(() =>
  import("../pages/partnerPages/Bussness/Gallery/PicturesGallery")
);
const TeamManageMent = lazy(() =>
  import("../pages/partnerPages/Team/TeamData/TeamManageMent")
);
const AddMemberProfile = lazy(() =>
  import("../pages/partnerPages/Team/TeamData/AddTeamMember/AddMemberProfile")
);
const EditTeamData = lazy(() =>
  import("../pages/partnerPages/Team/TeamData/EditTeamData/EditTeamData")
);
const EmployeeSchedule = lazy(() =>
  import(
    "../pages/partnerPages/Team/TeamData/EmployeeSchedule/EmployeeSchedule"
  )
);
const Reports = lazy(() => import("../pages/partnerPages/Reports/Reports"));
const LookPage = lazy(() =>
  import("../pages/partnerPages/Look/LookPage/LookPage")
);
const AddLook = lazy(() =>
  import("../pages/partnerPages/Look/AddALook/AddLook")
);
const EditLook = lazy(() =>
  import("../pages/partnerPages/Look/EditLook/EditLook")
);
const PersonalDetails = lazy(() =>
  import("../pages/partnerPages/PersonalDetails/PersonalDetails")
);

export default function PartnerRoutes() {
  return (
    <>
      {/* Public Partner Routes */}
      <Route path="/partner" element={<PartnerPage />}>
        <Route path="/partner" element={<PartnerHome />} />
        <Route path="/partner/authchoice" element={<AuthChoice />} />
        <Route path="/partner/login" element={<LoginPage />} />
      </Route>

      {/* Partner Dashboard */}
      <Route path="/partner/dashboard" element={<PartnerPageLayout />}>
        <Route path="/partner/dashboard" element={<Dashboard />} />
        <Route
          path="/partner/dashboard/newSalonSetting"
          element={<NewSalonSetting />}
        />
        <Route
          path="/partner/dashboard/appointment/calendar"
          element={<AppointmentCalendar />}
        />

        {/* Services */}
        <Route path="/partner/dashboard/service" element={<ServiceCatalog />} />
        <Route
          path="/partner/dashboard/service/addservice"
          element={<AddServices />}
        />
        <Route
          path="/partner/dashboard/service/editservice"
          element={<EditService />}
        />

        {/* Appointments */}
        <Route
          path="/partner/dashboard/addappoinment"
          element={<AddAppoinment />}
        />

        {/* Account / Business */}
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
        <Route path="/partner/dashboard/storetime" element={<ServiceOffer />} />
        <Route
          path="/partner/dashboard/location"
          element={<ServiceLocation />}
        />
        <Route
          path="/partner/dashboard/PicturesGallery"
          element={<PicturesGallery />}
        />

        {/* Team */}
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
          path="/partner/dashboard/EmployeeSchedule/:id"
          element={<EmployeeSchedule />}
        />

        {/* Reports & Looks */}
        <Route path="/partner/dashboard/reports" element={<Reports />} />
        <Route path="/partner/dashboard/look" element={<LookPage />} />
        <Route path="/partner/dashboard/add-look" element={<AddLook />} />
        <Route path="/partner/dashboard/edit-look/:id" element={<EditLook />} />
      </Route>
    </>
  );
}
