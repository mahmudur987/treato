import React from "react";
import styles from "./EditService.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import BasicDetailsForm from "../../../components/Services/EditService/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../components/Services/EditService/TeamMembers/TeamMembers";
import { singleSalon } from "../../../utils/data";
const EditService = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category_id = queryParams.get("category");
  const subcategory_id = queryParams.get("subcategory");
  const salonServices = singleSalon.salon.services[0];
  const { category, subCategories } = findServiceData(
    salonServices,
    category_id,
    subcategory_id
  );

  console.log(singleSalon.salon);

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
          <h1>
            <span> Edit Service</span>
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

export default EditService;

const findServiceData = (data, category_id, subcategory_id) => {
  // Iterate through mainCategories to find the specified category
  const category = data.mainCategories.find(
    (category) => category._id === category_id
  );

  if (category) {
    const subcategory = category.subCategories.find(
      (subcategory) => subcategory._id === subcategory_id
    );

    if (subcategory) {
      return { category, subcategory };
    }
  }
  return null;
};
