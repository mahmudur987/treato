import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaUsers } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { useQuery } from "react-query";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
import axiosInstance from "../../../../../services/axios";
import Slider from "react-slick";
import { useStatistics } from "../../../../../services/superAdmin/Dashboard";
const Header = () => {
  const [selectedOption, setSelectedOption] = useState("last 90 days");
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
  const { data: statics } = useStatistics(selectedOption);
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (isLoading) {
    <LoadSpinner />;
  }
  console.log(" old daata", data);
  console.log(" new", statics);
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
          <Slider {...settings}>
            {/* new user */}
            <div>
              <div
                style={{ backgroundColor: "yellow" }}
                className={styles.card}
              >
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
            </div>
            {/* average sale  */}
            <div>
              <div
                style={{ backgroundColor: "skyblue" }}
                className={styles.card}
              >
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
            </div>

            {/* total appointments */}

            <div>
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
          </Slider>
        </div>
      )}

      {isError && <ErrorComponent message={error.message} />}
    </section>
  );
};

export default Header;
