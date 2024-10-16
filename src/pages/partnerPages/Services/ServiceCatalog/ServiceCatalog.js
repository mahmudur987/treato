import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ServiceCatalog.module.css";

import { MemoizedServicesDropDown } from "../../../../components/Services/ServiceCatalog/ServicesDropDown/ServicesDropDown";

import AddCategory from "../../../../components/_modals/Addcategory/AddCategory";
import { BiMenuAltLeft } from "@react-icons/all-files/bi/BiMenuAltLeft";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import i from "../../../../assets/svgs/icon (33).svg";

import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import CustomSelect2 from "../../../../components/Select/CustomeSelect2/CustomeSelect2";
import NoDataDisplay from "../../../../components/NodataToDisplay/NoDataDisplay";
const ServiceCatalog = () => {
  const [showAddMenu, setshowAddmenu] = useState(false);
  const { data, isLoading, isError, error } = useSingleSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("All");
  const [serviceType, setServiceType] = useState([]);
  useEffect(() => {
    const uniqueDataArray = data?.salon?.services;
    const x = uniqueDataArray?.map((x) => x.service_name);
    setServiceType(x);
  }, [data]);

  const filteredData = data?.salon?.services
    ?.filter((x) => {
      if (selectedServiceType === "All") {
        return x;
      } else {
        return x.service_name === selectedServiceType;
      }
    })
    ?.filter((x) => x.mainCategories.length > 0);

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
    return (
      <ErrorComponent message={error ? error.message : "No data available"} />
    );
  }

  if (!data || !data.salon || isError) {
    return <ErrorComponent message={"No data available"} />;
  }

  const handleAddMenuChange = () => {
    setshowAddmenu((pre) => !pre);
  };

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
                {serviceType?.length > 0 && (
                  <CustomSelect2
                    options={["All", ...serviceType]}
                    value={selectedServiceType}
                    onChange={setSelectedServiceType}
                  />
                )}
              </div>
            </div>
            <div className={styles.headerAction}>
              <button onClick={handleAddMenuChange} className={styles.submit}>
                <img src={i} alt="" />

                <span>Add Service</span>
              </button>
            </div>

            {showAddMenu && (
              <div className={styles.addMenu} onClick={handleAddMenuChange}>
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
              <MemoizedServicesDropDown key={i} data={data} />
            ))}

          {filteredData.length === 0 && (
            <NoDataDisplay message={"No data to show"} />
          )}
        </div>
      </section>
      <AddCategory showModal={isModalOpen} onClose={closeModal} />

      <div onClick={handleAddMenuChange} className={styles.plusButtonWrapper}>
        <button>
          <FaPlus />
        </button>
      </div>
    </main>
  );
};

export default ServiceCatalog;
