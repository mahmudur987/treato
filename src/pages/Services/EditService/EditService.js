import React, { useEffect, useState } from "react";
import styles from "./EditService.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicDetailsForm from "../../../components/Services/EditService/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../components/Services/EditService/TeamMembers/TeamMembers";

import { editService } from "../../../services/salon";
import { useSingleSalon } from "../../../services/salon";
import { toast } from "react-toastify";

const EditService = () => {
  const { data: singleSalon, isLoading, isError, error } = useSingleSalon();
  const location = useLocation();

  const [diesabled, setDiesabled] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const service_id = queryParams.get("servicetype");
  const category_id = queryParams.get("category");
  const subcategory_id = queryParams.get("subcategory");
  const navigate = useNavigate();
  const [basicDetails, setBasicDetails] = useState({});
  const [teamMember, setTeamMember] = useState([]);
  const [days, setdays] = useState([]);
  const { service, category, subcategory } =
    findServiceData(singleSalon, service_id, category_id, subcategory_id) || {};

  const handleSubmit = async () => {
    const neweditService = {
      service_name: basicDetails.selectedServiceType,
      service_description: basicDetails.description,
      stylists: teamMember,
      mainCategories: [
        {
          category_name: basicDetails.selectCategory,
          subCategories: [
            {
              service_name: basicDetails.serviceName,
              price: Number(basicDetails.price),
              time_takenby_service: basicDetails.duration,
            },
          ],
        },
      ],
    };

    // const res = await editService(neweditService);

    console.log(neweditService);
  };
  useEffect(() => {
    setDiesabled((pre) => !pre);
  }, [basicDetails, teamMember, days]);
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
          <button
            onClick={() => navigate("/service")}
            className={styles.cancel}
          >
            Cancel
          </button>
          <button
            disabled={diesabled}
            onClick={handleSubmit}
            className={styles.submit}
            style={{
              backgroundColor: `${diesabled ? "#EBEDF0" : ""}`,
              color: `${diesabled ? "#939CA3" : ""}`,
            }}
          >
            Save Change
          </button>
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
