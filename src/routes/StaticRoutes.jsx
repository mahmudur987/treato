import React, { lazy } from "react";
import { Route } from "react-router-dom";

const AboutUsPage = lazy(() =>
  import("../layouts/AboutUsPageLayout/AboutUsPage")
);
const Privacy = lazy(() => import("../layouts/PrivacyPolicyLayout/Privacy"));
const SubBar = lazy(() =>
  import("../components/PrivacyPolicy/PrivacyBar/SubBar")
);
const Termoptions = lazy(() =>
  import("../components/PrivacyPolicy/TermOptions/TermMenu")
);
const PrivacyService = lazy(() =>
  import("../components/PrivacyPolicy/PrivacyPolicy/PrivacyPolicy")
);
const FrequentlyAskedQuestionsPage = lazy(() =>
  import(
    "../layouts/FrequentlyAskedQuestionsLayout/FrequentlyAskedQuestionsPage"
  )
);
const PricingPage = lazy(() => import("../layouts/PricingLayout/PricingPage"));
const ContactUsLayout = lazy(() =>
  import("../layouts/ContactUsLayout/ContactUsLayout")
);

export default function StaticRoutes() {
  return (
    <>
      <Route path="/Aboutuspage" element={<AboutUsPage />} />
      <Route path="/Privacy" element={<Privacy />}>
        <Route path="/Privacy" element={<SubBar />}>
          <Route path="/Privacy/termofuse" element={<Termoptions />} />
          <Route path="/Privacy/policy" element={<PrivacyService />} />
        </Route>
      </Route>
      <Route
        path="/frequentlyaskedquestions"
        element={<FrequentlyAskedQuestionsPage />}
      />
      <Route path="/Pricing" element={<PricingPage />} />
      <Route path="/contactus" element={<ContactUsLayout />} />
    </>
  );
}
