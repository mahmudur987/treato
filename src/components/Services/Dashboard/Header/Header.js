import React, { useState } from "react";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import styles from "./Header.module.css";
import userIcon from"../../../../assets/icons/Dashboard/header/Snapshot_Icons (2).png";
import clipBoardIcon from"../../../../assets/icons/Dashboard/header/Snapshot_Icons (1).png";
import clip2 from"../../../../assets/icons/Dashboard/header/Snapshot_Icons.png";

import { BsClipboard2Check } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { useQuery } from "react-query";
import axiosInstance from "../../../../services/axios";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
const Header = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [selectedOption],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance(
        `sales/getSalonGeneralAnalytics?days=${Number(
          selectedOption.slice(5, 7)
        )}`,
        { headers }
      );
      return data;
    },
  });

  const {
    newUsers,
    incrementOfNewUsers,
    incrementOfNewUsersPercentage,
    newAmount,
    incrementOfNewAmount,
    incrementOfNewAmountPercentage,
    newAppointments,
    incrementOfNewAppointments,
    incrementOfNewAppointmentsPercentage,
  } = data || {};
  if (isLoading) {
    <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <section className={styles.mainContainer}>
      <h1 className={styles.heading}>Dashboard</h1>

      <p className={styles.selectWrapper}>
        <CustomSelect2
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </p>

      {data && (
        <div className={styles.contents}>
          {/* new user */}
          <div style={{ backgroundColor: "#FFCE6E" }} className={styles.card}>
            <div className={styles.cardLeft}>
              {/* <FaUsers /> */}
              <img src={userIcon} width={36} height={36} alt="New user" srcset="" title="New user icon" />
              <div className={styles.cardMiddle}>
                <p>New user</p>

                <h3>{newUsers}</h3>
              </div>
            </div>

            <div className={styles.cardRight}>
              <IoIosArrowUp className={styles.UpArrow} />
              {incrementOfNewUsers}({incrementOfNewUsersPercentage}%)
            </div>
          </div>
          {/* avarage sale  */}
          <div style={{ backgroundColor: "#88C5E8" }} className={styles.card}>
            <div className={styles.cardLeft}>
            <img src={clipBoardIcon} width={36} height={36} alt="Clipboard" srcset="" title="Average Sales icon" />
              <div className={styles.cardMiddle}>
                <p>Average Sales</p>

                <h3>₹{newAmount} </h3>
              </div>
            </div>

            <div className={styles.cardRight}>
              <IoIosArrowUp />
              {incrementOfNewAmount}({incrementOfNewAmountPercentage}%)
            </div>
          </div>

          {/* total appoinments */}

          <div style={{ backgroundColor: "#F1A0C2" }} className={styles.card}>
            <div className={styles.cardLeft}>
            <img src={clip2} width={36} height={36} alt="Appointment" srcset="" title="Appointment icon" />
              <div className={styles.cardMiddle}>
                <p>Total Appointments</p>
                <h3>{newAppointments}</h3>
              </div>
            </div>

            <div className={styles.cardRight}>
              <IoIosArrowUp />
              {incrementOfNewAppointments}(
              {incrementOfNewAppointmentsPercentage}
              %)
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
