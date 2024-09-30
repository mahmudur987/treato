import React, { memo } from "react";
import styles from "./BasicDetailsPartner.module.css";

import BasicInputs from "../Input/BasicInputs";

const BasicDetailsPartner = ({ salonData, handleChange }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.from}>
          <h2 className={styles.Heading1}>Basic Details</h2>
          <div className={styles.usr_detail_body}>
            <div className={styles.usr_detail_box}>
              <label htmlFor="salon_name">
                <div className={styles.usr_detail_label}>Business Name</div>
                <BasicInputs
                  placeholder="ABC Beauty Parlour"
                  className={styles.usr_detail_input}
                  NAME={"salon_name"}
                  type={"text"}
                  id={"salon_name"}
                  value={salonData.salon_name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={styles.usr_detail_box}>
              <label htmlFor="Website">
                <div className={styles.usr_detail_label}>
                  Website <span className={styles.optional}>(optional)</span>
                </div>
                <BasicInputs
                  placeholder="www.abcbeauty.com"
                  type={"text"}
                  id={"website"}
                  NAME={"website"}
                  value={salonData.website}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className={styles.usr_detail_boxs}>
            <div className={styles.usr_detail_label}> About Business </div>

            <BasicInputs
              type="textarea"
              placeholder="An overview of your business which will be shown on your salon page. You can edit it anytime on your Account Settings page."
              NAME={"salons_description"}
              value={salonData.salons_description}
              onChange={handleChange}
              style={`${styles.input} ${styles.textarea}`}
            />
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
      </div>
    </>
  );
};

export default BasicDetailsPartner;
export const MemoizedBasicDetailsPartner = memo(BasicDetailsPartner);
