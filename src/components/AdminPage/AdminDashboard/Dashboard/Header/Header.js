import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { IoIosArrowUp } from "@react-icons/all-files/io/IoIosArrowUp";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
import Slider from "react-slick";
import { useStatistics } from "../../../../../services/superAdmin/Dashboard";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import cardLeft from "../../../../../assets/svgs/icon (3).svg";
import cardMiddle from "../../../../../assets/svgs/icon (4).svg";
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
      <div className={styles.wrapper}>
        <span>
          <IoMdArrowBack />
        </span>
        <h1 className={styles.heading}>Dashboard</h1>
      </div>

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
              <div className={`${styles.card} ${styles.bgCard}`}>
                <div className={styles.cardLeft}>
                  <FaUsers className={styles.FaUsers} />
                  <div className={styles.cardMiddle}>
                    <p>New user</p>

                    <h3>{Number(data?.totalUsersCount).toFixed(2)}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp className={styles.arrowUp} />
                  {Number(data?.usersCount).toFixed(2)}(
                  {Number(data?.usersPercentage).toFixed(2)}%)
                </div>
              </div>
            </div>
            {/* average sale  */}
            <div>
              <div className={`${styles.card} ${styles.bgCard1}`}>
                <div className={styles.cardLeft}>
                  <img src={cardLeft} alt="down arrow" />

                  <div className={styles.cardMiddle}>
                    <p>Average Sales</p>

                    <h3>₹{Number(data?.totalSales).toFixed(2)} </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp className={styles.arrowUp} />{" "}
                  {Number(data?.averageSales).toFixed(2)} (
                  {Number(data?.averageSalesPercentage).toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* total appointments */}

            <div>
              <div className={`${styles.card} ${styles.bgCard2}`}>
                <div className={styles.cardLeft}>
                  <img src={cardMiddle} alt="down arrow" />

                  <div className={styles.cardMiddle}>
                    <p>Total Appointments</p>
                    <h3>{Number(data?.appointmentCount).toFixed(2)}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp className={styles.arrowUp} />{" "}
                  {Number(data?.percentageChange).toFixed(2)} (
                  {Number(data?.appointmentPercentage).toFixed(2)}
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
