import React, { lazy } from "react";
import { Route } from "react-router-dom";

const CareersPage = lazy(() => import("../layouts/CareersLayout/CareersPage"));
const CurrentOpenings = lazy(() =>
  import("../pages/Careers/CurrentOpenings/CurrentOpenings")
);
const JobDescription = lazy(() =>
  import("../pages/Careers/JobDescription/JobDescription")
);
const JobDetails = lazy(() => import("../pages/Careers/Details/Details"));

export default function CareersRoutes() {
  return (
    <Route path="/careers" element={<CareersPage />}>
      <Route path="/careers/currentopenings" element={<CurrentOpenings />} />
      <Route path="/careers/jobdescription/:id" element={<JobDescription />} />
      <Route path="/careers/jobdetails/:id" element={<JobDetails />} />
    </Route>
  );
}
