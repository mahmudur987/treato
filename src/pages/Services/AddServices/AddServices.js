import React, { useEffect, useState } from "react";
import styles from "./AddServices.module.css";
import { Link } from "react-router-dom";
import BasicDetailsForm from "../../../components/Services/AddServices/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../components/Services/AddServices/TeamMembers/TeamMembers";
const AddServices = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobile, setIsMobile] = useState(false);
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
  return (
    <main className={styles.mainContainer}>
      <Link to={"/service"} className={styles.backLink}>
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
          <Link to={"/service"} className={styles.backLink}>
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
          .
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
              {currentStep === 1 && mobile && <BasicDetailsForm />}
              {!mobile && <BasicDetailsForm />}
            </div>
          </div>
          <div className={styles.rightContent}>
            <TeamMembers currentStep={currentStep} mobile={mobile} />
          </div>
        </div>

        <div className={styles.buttontContainer}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.submit}>Submit</button>
          <button onClick={handleNextStep} className={styles.save}>
            Save and Continue
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddServices;
