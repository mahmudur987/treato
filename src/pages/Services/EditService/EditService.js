import React, { useState } from "react";
import styles from "./EditService.module.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BasicDetailsForm from "../../../components/Services/EditService/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../components/Services/EditService/TeamMembers/TeamMembers";
import {} from "../../../utils/data";

import { useSingleSalon } from "../../../services/salon";
import { toast } from "react-toastify";

const EditService = () => {
  const { data: singleSalon, isLoading, isError, error } = useSingleSalon();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const service_id = queryParams.get("servicetype");
  const category_id = queryParams.get("category");
  const subcategory_id = queryParams.get("subcategory");
  const salonServices = singleSalon?.salon?.services[0];
  const navigate = useNavigate();
  const [basicDetails, setBasicDetails] = useState({});
  const [teamMember, setTeamMember] = useState([]);
  const [days, setdays] = useState([]);
  const { service, category, subcategory } =
    findServiceData(singleSalon, service_id, category_id, subcategory_id) || {};
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return toast.error(error.message);
  }
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
              <BasicDetailsForm
                salon={singleSalon.salon}
                service={service}
                setBasicDetails={setBasicDetails}
                category={category}
                subcategory={subcategory}
              />
            </div>
          </div>
          <div className={styles.rightContent}>
            <TeamMembers setTeamMember={setTeamMember} setdays={setdays} />
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

const findServiceData = (data, service_id, category_id, subcategory_id) => {
  // Iterate through mainCategories to find the specified category

  const service = data?.salon?.services?.find((x) => x._id === service_id);

  const category = service?.mainCategories?.find(
    (category) => category._id === category_id
  );

  if (category) {
    const subcategory = category?.subCategories.find(
      (subcategory) => subcategory._id === subcategory_id
    );

    if (subcategory) {
      return { service, category, subcategory };
    }
  }
  return null;
};
