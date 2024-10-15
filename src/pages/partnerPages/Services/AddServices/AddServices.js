import React, { useEffect, useState } from "react";
import styles from "./AddServices.module.css";
import { Link, useNavigate } from "react-router-dom";
import BasicDetailsForm, {
  MemoizedBasicDetailsForm,
} from "../../../../components/Services/AddServices/BasicDetailsForm/BasicDetailsForm";
import TeamMembers, {
  MemoizedTeamMembers,
} from "../../../../components/Services/AddServices/TeamMembers/TeamMembers";
import { addNewService, useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
import { backTick } from "../../PersonalDetails/PersonalDetails";

const AddServices = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [mobile, setIsMobile] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [teamMember, setTeamMember] = useState([]);
  const [days, setdays] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  //api fetching
  const { data, isLoading, isError, error } = useSingleSalon();

  const service = data?.salon.services.find(
    (x) => x._id === basicDetails.selectedServiceType?.id
  );
  const mainCategory = service?.mainCategories.find(
    (x) => x.category_name === basicDetails.selectCategory
  );

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    // Input validations
    if (!basicDetails.serviceName || teamMember.length <= 0) {
      return toast.error(
        "Please provide a service name and add at least one team member."
      );
    }

    const newService = {
      serviceId: service._id,
      mainCategoryId: mainCategory._id,
      stylists: teamMember,
      subCategoryData: [
        {
          service_name: basicDetails.serviceName,
          price: Number(basicDetails.price),
          time_takenby_service: basicDetails.duration,
        },
      ],
    };

    try {
      const res = await addNewService(newService);

      // Check response
      if (res.res) {
        toast.success("New service added successfully!");
        // Reset state only if service was added successfully
        setBasicDetails({ serviceName: "", price: "", duration: "" }); // Reset to empty string or default values
        setTeamMember([]); // Clear team member selection
        navigate("/partner/dashboard/service");
        setSubmit(true);
        setLoading(false);
      } else {
        setLoading(false);

        throw new Error(res.err || "Failed to add new service.");
      }
    } catch (error) {
      console.error("Error while adding new service:", error);
      setLoading(false);

      toast.error(
        error.message || "An error occurred while adding the service."
      );
    }
  };

  // for the ui
  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };
  const handlePrevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  useEffect(() => {
    const checkWindowWidth = () => {
      const newIsMobile = window.innerWidth < 700;
      setIsMobile(newIsMobile);
    };
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) {
    toast.error(error.message, { toastId: 1 });
  }

  return (
    <main className={styles.mainContainer}>
      <Link to={"/partner/dashboard/service"} className={styles.backLink}>
        <img src={backTick} alt="" />
      </Link>

      <section className={styles.container}>
        <header className={styles.header}>
          <Link to={"/partner/dashboard/service"} className={styles.backLink}>
            <img src={backTick} alt="" />
          </Link>
          <h1>
            <span> Add a Service</span>
          </h1>
          <p>Enter details to add a service to your salon’s catalog.</p>
        </header>

        {/* mobile slider */}
        <div onClick={handlePrevStep} className={styles.slider}>
          .{" "}
          <div
            className={styles.step}
            style={{ backgroundColor: `${currentStep >= 1 ? "blue" : "#ddd"}` }}
          ></div>
          <div
            className={styles.step}
            style={{ backgroundColor: `${currentStep >= 2 ? "blue" : "#ddd"}` }}
          ></div>
          <div
            className={styles.step}
            style={{ backgroundColor: `${currentStep >= 3 ? "blue" : "#ddd"}` }}
          ></div>
        </div>

        {/* details */}

        <div className={styles.content}>
          <div className={styles.leftContent}>
            {currentStep === 1 && mobile && <h2>Basic Details </h2>}
            {!mobile && <h2>Basic Details </h2>}

            <div className={styles.formWrapper}>
              {currentStep === 1 && mobile && (
                <MemoizedBasicDetailsForm
                  salon={data.salon}
                  setBasicDetails={setBasicDetails}
                  submit={submit}
                />
              )}
              {!mobile && (
                <MemoizedBasicDetailsForm
                  setBasicDetails={setBasicDetails}
                  salon={data.salon}
                  submit={submit}
                />
              )}
            </div>
          </div>
          <div className={styles.rightContent}>
            <MemoizedTeamMembers
              setdays={setdays}
              setTeamMember={setTeamMember}
              currentStep={currentStep}
              mobile={mobile}
              submit={submit}
            />
          </div>
        </div>

        <div className={styles.buttontContainer}>
          <button
            onClick={() => navigate("/partner/dashboard/service")}
            className={styles.cancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={styles.submit}
            disabled={loading}
          >
            {loading ? "loading" : "Submit"}
          </button>
          <button
            onClick={handleNextStep}
            className={styles.save}
            disabled={loading}
          >
            Save and Continue
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddServices;
