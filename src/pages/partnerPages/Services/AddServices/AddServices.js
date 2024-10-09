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

const AddServices = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [mobile, setIsMobile] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [teamMember, setTeamMember] = useState([]);
  const [days, setdays] = useState([]);

  //api fetching
  const { data, isLoading, isError, error } = useSingleSalon();

  const service = data?.salon.services.find(
    (x) => x._id === basicDetails.selectedServiceType?.id
  );
  const mainCategory = service?.mainCategories.find(
    (x) => x.category_name === basicDetails.selectCategory
  );

  const handleSubmit = async () => {
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

    console.log(newService);

    try {
      const res = await addNewService(newService);

      // Check response
      if (res.res) {
        toast.success("New service added successfully!");
        // Reset state only if service was added successfully
        setBasicDetails({ serviceName: "", price: "", duration: "" }); // Reset to empty string or default values
        setTeamMember([]); // Clear team member selection
        navigate("/partner/dashboard/service");
      } else {
        throw new Error(res.err || "Failed to add new service.");
      }
    } catch (error) {
      console.error("Error while adding new service:", error);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 12H5"
            stroke="#08090A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="#08090A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>

      <section className={styles.container}>
        <header className={styles.header}>
          <Link to={"/partner/dashboard/service"} className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 12H5"
                stroke="#08090A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="#08090A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
                />
              )}
              {!mobile && (
                <MemoizedBasicDetailsForm
                  setBasicDetails={setBasicDetails}
                  salon={data.salon}
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
            />
          </div>
        </div>

        <div className={styles.buttontContainer}>
          <button
            onClick={() => navigate("/partner/dashboard/service")}
            className={styles.cancel}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.submit}>
            Submit
          </button>
          <button onClick={handleNextStep} className={styles.save}>
            Save and Continue
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddServices;
