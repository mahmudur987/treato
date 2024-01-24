import React from "react";
import styles from "./BasicDetailForm.module.css";
const BasicDetailsForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.nameOfService}>
        <label htmlFor="serviceType">Service Type</label>
        <div className={styles.selectWrapper}>
          <select name="serviceType" id="serviceType">
            <option value="Hair">Hair</option>
            <option value="Hair">Hair</option>
            <option value="Hair">Hair</option>
          </select>
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
      {/* add subcategory */}
      <div className={styles.subCategory}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 4.16602V15.8327"
            stroke="#0D69D7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.16797 10H15.8346"
            stroke="#0D69D7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h5>Add sub-category</h5>
      </div>
      {/* name of service */}
      <div className={styles.nameOfService}>
        <label>Name of the service</label>

        <div className={styles.inpurWrapper}>
          <input type="text" name="" id="" placeholder="e.g. Haircut for men" />
        </div>
      </div>

      {/* selects and text area */}

      <div className={styles.selectsContainer}>
        <div className={styles.content}>
          <h3>Duration of Service</h3>

          <div className={styles.selectWrapper}>
            <select name="" id="">
              <option value="30minn">30 min</option>
              <option value="30minn">40 min</option>
              <option value="30minn">50 min</option>
            </select>
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

        <div className={styles.content}>
          <h3>Available for</h3>

          <div className={styles.selectWrapper}>
            <select name="" id="">
              <option value="30minn">30 min</option>
              <option value="30minn">40 min</option>
              <option value="30minn">50 min</option>
            </select>
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
      </div>

      <div className={styles.textAreaContainer}>
        <h3>
          Describe the Service
          <span>(optional)</span>
        </h3>

        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Briefly describe the service and add relevant details such as aftercare."
        ></textarea>
      </div>
      <div className={styles.pricing}>
        <h3>Pricing</h3>
        <div className={styles.selectsContainer}>
          <div className={styles.content}>
            <h3>Price</h3>

            <div className={styles.selectWrapper}>
              <input type="text" placeholder="e.g. ₹999.00" />
            </div>
          </div>

          <div className={styles.content}>
            <h3>Taxes & Fees</h3>

            <div className={styles.selectWrapper}>
              <select name="" id="">
                <option value="30minn">30 min</option>
                <option value="30minn">40 min</option>
                <option value="30minn">50 min</option>
              </select>
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
        </div>
      </div>
    </form>
  );
};

export default BasicDetailsForm;
