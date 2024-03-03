import React from "react";
import styles from "./AddAppointment.module.css";
import { Link } from "react-router-dom";
import AppointmentDetails from "../../../../components/Services/AddAppoinment/AppointmentDetails/AppointmentDetails";
import ClientsDetails from "../../../../components/Services/AddAppoinment/ClientDetails/ClientDetails";

const AddAppoinment = () => {
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
            <span> Add Appoinments</span>
          </h1>
          <p>
            Enter visit details to add a walk-in appointment to your database
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.leftContent}>
            <AppointmentDetails />
          </div>
          <div className={styles.rightContent}>
            <ClientsDetails />
          </div>
        </div>

        <div className={styles.buttontContainer}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.submit}>Submit</button>
          <button className={styles.save}>Save and Continue</button>
        </div>
      </section>
    </main>
  );
};

export default AddAppoinment;
