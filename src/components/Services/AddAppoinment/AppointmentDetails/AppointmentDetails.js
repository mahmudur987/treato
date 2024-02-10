import React, { useState } from "react";
import styles from "./AppointmentDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import SelectServiceModal from "../../../_modals/SelectServiceModal/SelectServiceModal";
const AppointmentDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <h3 className={styles.heding}>Appointment Details</h3>
        {/* date select */}
        <div className={styles.dateWrapper}>
          <label htmlFor="date">Date</label>
          <input type="date" name="appointment data" id="" />
        </div>
        {/* service category */}

        <div className={styles.serviceCategory}>
          <label htmlFor="">Service Category</label>

          <CustomSelect2
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
          />
        </div>
        {/* select service */}

        <div className={styles.selectService}>
          <label htmlFor="">Select Service </label>
          <CustomSelect2
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
          />
        </div>

        <p onClick={() => openModal()} className={styles.addMoreService}>
          <span>+</span>
          <span>Add more service</span>
        </p>

        {/* time */}

        <div className={styles.timeWrapper}>
          <div className={styles.selectService}>
            <label htmlFor="">Start Time </label>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </div>{" "}
          <div className={styles.selectService}>
            <label htmlFor="">Duration of service</label>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        {/* adition al comments */}
        <div className={styles.comments}>
          <label htmlFor="comments">
            Additional comments <span>(optional)</span>
          </label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <SelectServiceModal showModal={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default AppointmentDetails;
