import React, { memo, useState } from "react";
import styles from "./BasicDetailsPartner.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg";
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg";
import { Link } from "react-router-dom";
import BasicInputs from "../Input/BasicInputs";

const BasicDetailsPartner = ({ salonData, handleChange }) => {
  const [name, setName] = useState(true);
  const [about, setAbout] = useState(true);
  const [web, setWeb] = useState(true);

  return (
    <>
      <div>
        <div className={styles.usr_detail_head}>
          <Link
            to={"/partner/dashboard/PartnerAccountSetting"}
            className={styles.Pictures}
          >
            <span>
              <img loading="lazy" src={arrowLeft} alt="arrowLeft" />
            </span>
          </Link>
          <p>Business Profile</p>
        </div>
        <h2 className={styles.Heading1}>Basic Details</h2>
        <div>
          <div className={styles.usr_detail_body}>
            <div className={styles.usr_detail_box}>
              <label htmlFor="salon_name">
                <div className={styles.usr_detail_label}>Business Name</div>
                <BasicInputs
                  placeholder="She Hair & Beauty"
                  className={styles.usr_detail_input}
                  NAME={"salon_name"}
                  type={"text"}
                  id={"salon_name"}
                  value={salonData.salon_name}
                  onChange={handleChange}
                  DISABLED={name}
                />
              </label>

              <img
                loading="lazy"
                src={editImg}
                alt=""
                className={styles.usr_detail_edit}
                onClick={() => setName(!name)}
              />
            </div>
            <div className={styles.usr_detail_box}>
              <label htmlFor="Website">
                <div className={styles.usr_detail_label}>
                  Website <span className={styles.optional}>(optional)</span>
                </div>
                <BasicInputs
                  placeholder="www.shehairandbeauty.com"
                  type={"text"}
                  id={"website"}
                  NAME={"website"}
                  value={salonData.website}
                  onChange={handleChange}
                  DISABLED={web}
                />
              </label>

              <img
                loading="lazy"
                src={editImg}
                alt="editImg"
                className={styles.usr_detail_edit}
                onClick={() => setWeb(!web)}
              />
            </div>
          </div>

          <div className={styles.usr_detail_boxs}>
            <div className={styles.usr_detail_label}> About Business </div>

            <BasicInputs
              type="textarea"
              placeholder="Write Details Description About Your Salon"
              NAME={"salons_description"}
              value={salonData.salons_description}
              onChange={handleChange}
              style={`${styles.input} ${styles.textarea}`}
              DISABLED={about}
            />

            <img
              loading="lazy"
              src={editImg}
              alt="editImg"
              className={styles.usr_detail_edit_text}
              onClick={() => setAbout(!about)}
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
