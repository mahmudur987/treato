import React from "react";
import styles from "./AddServices.module.css";
import { Link } from "react-router-dom";
import BasicDetailsForm from "../../../components/Services/AddServices/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../components/Services/AddServices/TeamMembers/TeamMembers";
const AddServices = () => {
  return (
    <main className={styles.mainContainer}>
      <Link className={styles.backLink}>
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
          <h1>
            <span> Add a Service</span>
          </h1>
          <p>Enter details to add a service to your salon’s catalog.</p>
        </header>
        {/* details */}

        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h2>Basic Details </h2>
            <div className={styles.formWrapper}>
              <BasicDetailsForm />
            </div>
          </div>
          <div className={styles.rightContent}>
            <TeamMembers />
          </div>
        </div>

        <div className={styles.buttontContainer}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </section>
    </main>
  );
};

export default AddServices;
