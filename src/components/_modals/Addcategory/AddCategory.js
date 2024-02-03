// Modal.js
import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import CustomSelect from "../../Select/CustomeSelect";

const AddCategory = ({ showModal, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
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

        <h2 className={styles.modalHeading}>Add A new category</h2>

        <form className={styles.form}>
          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Service Type</label>

            <div className={styles.selectWrapper}>
              <CustomSelect
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Select Service Category</label>

            <div className={styles.selectWrapper}>
              <CustomSelect
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Appointment color</label>

            <div className={styles.selectWrapper}>
              <CustomSelect
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.cancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={styles.save}
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
