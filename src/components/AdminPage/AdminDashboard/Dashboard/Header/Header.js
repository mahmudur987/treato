import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaUsers } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
import Slider from "react-slick";
import { useStatistics } from "../../../../../services/superAdmin/Dashboard";
const Header = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];

  const { data, isLoading, isError, error } = useStatistics(selectedOption);

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

      {isLoading && <LoadSpinner />}

      {data && !isLoading && !isError && (
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

                    <h3>{data?.totalUsersCount}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp />
                  {data?.usersCount}({data?.usersPercentage}%)
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

                    <h3>₹{data?.totalSales} </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp /> {data?.averageSales} (
                  {data?.averageSalesPercentage}%)
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
                    <h3>{data?.appointmentCount}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp /> {data?.percentageChange} (
                  {data?.appointmentPercentage}
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
