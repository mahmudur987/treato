import React, { useState } from "react";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import styles from "./Header.module.css";
import { FaUsers } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
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
          <div style={{ backgroundColor: "yellow" }} className={styles.card}>
            <div className={styles.cardLeft}>
              <FaUsers />
              <div className={styles.cardMiddle}>
                <p>New user</p>

                <h3>{newUsers}</h3>
              </div>
            </div>

            <div className={styles.cardRight}>
              <IoIosArrowUp />
              {incrementOfNewUsers}({incrementOfNewUsersPercentage}%)
            </div>
          </div>
          {/* avarage sale  */}
          <div style={{ backgroundColor: "skyblue" }} className={styles.card}>
            <div className={styles.cardLeft}>
              <BsClipboardCheck />
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

          <div style={{ backgroundColor: "pink" }} className={styles.card}>
            <div className={styles.cardLeft}>
              <BsClipboard2Check />
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
