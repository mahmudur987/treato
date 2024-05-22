// Modal.js
import React, { useState } from "react";
import styles from "./SelectServiceModal.module.css";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { CiSearch } from "react-icons/ci";
const SelectServiceModal = ({
  showModal,
  onClose,
  selectedServices,
  setSelectedServices,
  mainCategories,
}) => {
  const [all, setAll] = useState(false);
  const toggleService = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const toggleCategory = (categoryId) => {
    const categoryServices = mainCategories
      .find((category) => category._id === categoryId)
      .subCategories.map((service) => service._id);
    setSelectedServices((prevSelected) =>
      prevSelected.some((id) => categoryServices.includes(id))
        ? prevSelected.filter((id) => !categoryServices.includes(id))
        : [...prevSelected, ...categoryServices]
    );
  };
  const handleSelectAll = () => {
    const allServices = mainCategories.flatMap((category) =>
      category.subCategories.map((service) => service._id)
    );
    setAll(!all);
    // Check if all services are already selected
    const allSelected = allServices.every((serviceId) =>
      selectedServices.includes(serviceId)
    );

    // Toggle selection based on the current state
    setSelectedServices((prevSelected) =>
      allSelected ? [] : [...prevSelected, ...allServices]
    );
  };

  const handleSubmit = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>Select Service</h2>
        {/* search */}
        <div className={styles.search}>
          <span>
            <CiSearch />
          </span>
          <input type="text" placeholder="Find service" />
        </div>
        {/* selectall */}
        <div className={styles.selectAll}>
          <label>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedServices.length ===
                mainCategories.flatMap((category) =>
                  category?.subCategories?.map((service) => service._id)
                ).length
              }
            />
            <span>Select All</span>
          </label>
        </div>
        <hr className={styles.hrDivider} />

        <form className={styles.form}>
          <div className={styles.serviceForm}>
            <div className={styles.categories}>
              {mainCategories.map((category) => (
                <div key={category._id} className={styles.category}>
                  <div
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(category._id)}
                  >
                    <input
                      checked={
                        all
                          ? all
                          : JSON.stringify(
                              category.subCategories.map((x) => x._id)
                            ) == JSON.stringify(selectedServices)
                      }
                      type="checkbox"
                      name=""
                      id=""
                    />{" "}
                    {category.category_name} ({category.subCategories.length})
                    item
                  </div>
                  {category.subCategories && (
                    <div className={`${styles.services} `}>
                      {category.subCategories.map((service) => (
                        <div
                          key={service._id}
                          className={`${styles.service} `}
                          onClick={() => toggleService(service._id)}
                        >
                          <p>
                            <input
                              checked={selectedServices.includes(service._id)}
                              type="checkbox"
                              name=""
                              id=""
                            />

                            <span>{service.service_name}</span>
                          </p>
                          <p>
                            <span>{service.time_takenby_service}</span>.
                            <span>$ {service.price}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancel}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className={styles.save} type="button" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectServiceModal;
