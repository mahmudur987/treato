import React from "react";
import styles from "./BasicDetailForm.module.css";
const BasicDetailsForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.serviceType}>
        <label htmlFor="serviceType">Service Type</label>

        <select name="serviceType" id="serviceType">
          <option value="Hair">Hair</option>
          <option value="Hair">Hair</option>
          <option value="Hair">Hair</option>
        </select>
      </div>
    </form>
  );
};

export default BasicDetailsForm;
