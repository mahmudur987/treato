import React, { useEffect, useState } from "react";
import styles from "./EditService.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicDetailsForm from "../../../../components/Services/EditService/BasicDetailsForm/BasicDetailsForm";
import TeamMembers from "../../../../components/Services/EditService/TeamMembers/TeamMembers";
import { editService, useSingleSalon } from "../../../../services/salon";
import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";

const EditService = () => {
  const {
    data: singleSalon,
    isLoading,
    isError,
    error,
    refetch,
  } = useSingleSalon();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const service_id = queryParams.get("servicetype");
  const category_id = queryParams.get("category");
  const subcategory_id = queryParams.get("subcategory");
  const [diesabled, setDiesabled] = useState(false);
  const navigate = useNavigate();
  const [basicDetails, setBasicDetails] = useState({});
  const [teamMember, setTeamMember] = useState([]);
  const [days, setdays] = useState([]);
  const { service, category, subcategory } =
    findServiceData(singleSalon, service_id, category_id, subcategory_id) || {};

  const allPeople = singleSalon?.salon?.stylists?.map((x) => {
    return {
      name: x.stylist_name,
      avatar: x.stylist_Img.public_url,
      id: x._id,
      servicesIds: x.services,
    };
  });
  const alredySelected = allPeople
    ?.filter((people) => people.servicesIds.includes(subcategory_id))
    .map((people) => people.id);

  const handleSubmit = async () => {
    const neweditService = {
      serviceId: service_id,
      mainCategoryId: category_id,
      subCategoryId: subcategory_id,
      oldStylist: alredySelected,
      newStylist: teamMember.map((people) => people.id),
      subCategoryData: {
        service_name: basicDetails.serviceName,
        price: Number(basicDetails.price),
        time_takenby_service: basicDetails.duration,
      },
    };
    console.log(neweditService);
    const res = await editService(neweditService);
    if (res.res) {
      console.log(res.res);
      toast.success(res.res ? res.res : "Added A new service ");
      navigate("/partner/dashboard/service");
    } else {
      console.log(res.err);
      toast.error("Error happen,sevice not added");
    }
  };
  const handleDeleteService = async () => {
    let url = `service/deleteSubCategory/${service_id}/${category_id}/${subcategory_id}`;
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    try {
      const { data } = await axiosInstance.delete(url, { headers });
      console.log(data);
      toast.success("service delete successfully");
      navigate("/partner/dashboard/service");
      refetch();
    } catch (error) {
      console.log("Erroor deleting data", error);
      toast.error(error.message);
    }
  };
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return toast.error(error.message);
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
        <div className={styles.headrWrapper}>
          <header className={styles.header}>
            <h1>
              <span> Edit Service</span>
            </h1>
            <p>Enter details to add a service to your salon’s catalog.</p>
          </header>
          <p className={styles.delete}>
            <button onClick={handleDeleteService}> Delete Service</button>
          </p>
        </div>

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
