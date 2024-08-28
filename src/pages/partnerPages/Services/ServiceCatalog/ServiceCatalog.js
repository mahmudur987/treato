import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ServiceCatalog.module.css";
import CustomSelect from "../../../../components/Select/CustomeSelect";
import ServicesDropDown from "../../../../components/Services/ServiceCatalog/ServicesDropDown/ServicesDropDown";

import AddCategory from "../../../../components/_modals/Addcategory/AddCategory";
import { BiMenuAltLeft } from "@react-icons/all-files/bi/BiMenuAltLeft";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
import { getAllServices } from "../../../../services/Services";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import CustomSelect2 from "../../../../components/Select/CustomeSelect2/CustomeSelect2";
import CustomSelect3 from "../../../../components/Select/CustomeSelect3/CustomSelect3";
import NoDataDisplay from "../../../../components/NodataToDisplay/NoDataDisplay";
const ServiceCatalog = () => {
  const [showAddMenu, setshowAddmenu] = useState(false);
  const { data, isLoading, isError, error } = useSingleSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("All");
  const [serviceType, setserviceType] = useState([]);
  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();
        if (res) {
          const uniqueDataArray = res?.data?.data.reduce(
            (uniqueArray, currentItem) => {
              // Check if there's already an object with the same 'name' in uniqueArray
              if (
                !uniqueArray.some(
                  (item) => item.service_name === currentItem.service_name
                )
              ) {
                // If not found, add this object to uniqueArray
                uniqueArray.push(currentItem);
              }
              return uniqueArray;
            },
            []
          );

          const data = uniqueDataArray?.map((x) => x.service_name);
          setserviceType(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllServices();
  }, []);

  const filteredData = data?.salon?.services?.filter((x) => {
    if (selectedServiceType === "All") {
      return x;
    } else {
      return x.service_name === selectedServiceType;
    }
  });

  console.log(filteredData);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    toast.error(error.message, { toastId: 1 });
    return (
      <ErrorComponent message={error ? error.message : "No data available"} />
    );
  }

  if (!data || !data.salon || isError) {
    return <ErrorComponent message={"No data available"} />;
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1>
            <span> Service Catalog</span>
          </h1>

          <div className={styles.headerRight}>
            <div className={styles.serviceType}>
              <p>Service Type</p>
              <div className={styles.selectWrapper}>
                <CustomSelect2
                  options={["All", ...serviceType]}
                  value={selectedServiceType}
                  onChange={setSelectedServiceType}
                />
              </div>
            </div>
            <div className={styles.headerAction}>
              <button
                onClick={() => setshowAddmenu((pre) => !pre)}
                className={styles.submit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5V19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 12H19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Add Service</span>
              </button>
            </div>

            {showAddMenu && (
              <div
                className={styles.addMenu}
                onClick={() => setshowAddmenu((pre) => !pre)}
              >
                <Link to={"/partner/dashboard/service/addservice"}>
                  Add a new Service
                </Link>
                <button onClick={openModal}>Add a new Category</button>
              </div>
            )}
          </div>

          <div className={styles.headrMobile}>
            <button>
              <BiMenuAltLeft />
            </button>
            <div className={styles.selectWrapper}>
              <CustomSelect2
                options={["All", ...serviceType]}
                value={selectedServiceType}
                onChange={setSelectedServiceType}
              />
            </div>
          </div>
        </header>
        {/* details */}

        <div className={styles.content}>
          {data &&
            filteredData?.map((data, i) => (
              <ServicesDropDown key={i} data={data} />
            ))}

          {filteredData.length === 0 && (
            <NoDataDisplay message={"No data to show"} />
          )}
        </div>
      </section>
      <AddCategory showModal={isModalOpen} onClose={closeModal} />

      <div
        onClick={() => setshowAddmenu((pre) => !pre)}
        className={styles.plusButtonWrapper}
      >
        <button>
          <FaPlus />
        </button>
      </div>
    </main>
  );
};

export default ServiceCatalog;
