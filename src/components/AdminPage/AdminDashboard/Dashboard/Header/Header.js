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
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #FFDFA2 0%, #FFCE6E 100%)",
                }}
                className={styles.card}
              >
                <div className={styles.cardLeft}>
                  <FaUsers style={{ color: "#F0A20B" }} />
                  <div className={styles.cardMiddle}>
                    <p>New user</p>

                    <h3>{Number(data?.totalUsersCount).toFixed(2)}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp style={{ color: "#08090A" }} />
                  {Number(data?.usersCount).toFixed(2)}(
                  {Number(data?.usersPercentage).toFixed(2)}%)
                </div>
              </div>
            </div>
            {/* average sale  */}
            <div>
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #BDE7FF 0%, #88C5E8 100%)",
                }}
                className={styles.card}
              >
                <div className={styles.cardLeft}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.1468 2.57133H28.919C27.8499 2.57133 26.8599 3.17286 26.2704 4.17973C26.0552 4.54747 25.4867 4.59141 25.2171 4.26516C24.3199 3.17286 23.1284 2.57133 21.8547 2.57133C20.5898 2.57133 19.3987 3.17286 18.5005 4.26516C18.2551 4.56399 17.7534 4.56469 17.5066 4.26446C16.6084 3.17286 15.4173 2.57133 14.1523 2.57133C12.8874 2.57133 11.6963 3.17286 10.7981 4.26516C10.5288 4.59423 9.96066 4.54817 9.74516 4.17973C9.15453 3.17286 8.16453 2.57133 7.09578 2.57133H6.8416C5.19313 2.57133 3.85156 3.9129 3.85156 5.56137V30.4383C3.85156 32.0868 5.19313 33.4283 6.8416 33.4283H7.09578C8.16418 33.4283 9.15418 32.8268 9.74586 31.8185C9.95926 31.4511 10.5274 31.404 10.7981 31.7349C11.6963 32.8265 12.8874 33.428 14.1523 33.428C15.4173 33.428 16.6084 32.8265 17.5066 31.7341C17.7534 31.4346 18.2551 31.4353 18.5005 31.7349C19.3987 32.8265 20.5898 33.428 21.8635 33.428C23.1284 33.428 24.3202 32.8265 25.2167 31.7356C25.4885 31.4065 26.0566 31.4543 26.27 31.8185C26.8603 32.8268 27.8503 33.4283 28.9194 33.4283H29.1472C30.7957 33.4283 32.1372 32.0868 32.1372 30.4383V5.56173C32.1372 3.9129 30.7953 2.57133 29.1468 2.57133ZM29.5655 30.4383C29.5655 30.6693 29.3778 30.857 29.1468 30.857H28.919C28.7032 30.857 28.5355 30.599 28.4891 30.5191C27.9139 29.5379 26.8504 28.9283 25.7142 28.9283C24.7498 28.9283 23.8453 29.3558 23.2307 30.1022C22.9991 30.3841 22.5132 30.8566 21.8547 30.8566C21.205 30.8566 20.7185 30.3834 20.4868 30.1022C19.262 28.6098 16.7465 28.6095 15.5203 30.1015C15.2886 30.3834 14.802 30.8566 14.1523 30.8566C13.5027 30.8566 13.0161 30.3834 12.7844 30.1022C12.1716 29.3558 11.2664 28.9283 10.3017 28.9283C9.16402 28.9283 8.10055 29.5386 7.5268 30.5191C7.48039 30.5983 7.31199 30.857 7.09613 30.857H6.84195C6.61098 30.857 6.42324 30.6693 6.42324 30.4383V5.56173C6.42324 5.33075 6.61098 5.14301 6.84195 5.14301H7.09613C7.31199 5.14301 7.48039 5.40176 7.52609 5.47946C8.10055 6.46137 9.16402 7.07169 10.3017 7.07169C11.2667 7.07169 12.172 6.64419 12.7844 5.89817C13.0161 5.61622 13.5027 5.14301 14.1523 5.14301C14.802 5.14301 15.2886 5.61622 15.5203 5.89747C16.7465 7.39091 19.262 7.38915 20.4868 5.89817C20.7185 5.61622 21.205 5.14301 21.8635 5.14301C22.5132 5.14301 22.9991 5.61587 23.2314 5.89887C23.8453 6.64419 24.7502 7.07169 25.7142 7.07169C26.8504 7.07169 27.9139 6.46208 28.4898 5.47946C28.5355 5.40106 28.7032 5.14301 28.919 5.14301H29.1468C29.3778 5.14301 29.5655 5.33075 29.5655 5.56173V30.4383Z"
                      fill="#284E63"
                    />
                    <path
                      d="M8.99645 19.2888H21.8534V21.8601H8.99645V19.2888ZM8.99609 24.4311H26.9898V27.0025H8.99609V24.4311ZM21.8499 11.5745H23.889L20.9411 14.5227L22.7591 16.3406L25.7073 13.3928V15.4318H28.2786V9.00316H21.8499V11.5745Z"
                      fill="#284E63"
                    />
                  </svg>

                  <div className={styles.cardMiddle}>
                    <p>Average Sales</p>

                    <h3>₹{Number(data?.totalSales).toFixed(2)} </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp style={{ color: "#08090A" }} />{" "}
                  {Number(data?.averageSales).toFixed(2)} (
                  {Number(data?.averageSalesPercentage).toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* total appointments */}

            <div>
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #FFD0F8 0%, #F1A0C2 100%)",
                }}
                className={styles.card}
              >
                <div className={styles.cardLeft}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 0L11.25 0.5625V2.25H13.5V0ZM13.5 2.25V4.5H11.25V2.25H11.2365C8.406 2.28375 6.33375 2.1825 4.6395 3.11625C3.7935 3.582 3.12075 4.37625 2.7495 5.36175C2.3805 6.34725 2.25 7.52175 2.25 9V27C2.25 28.4805 2.3805 29.6528 2.75175 30.6382C3.12075 31.626 3.7935 32.4135 4.64175 32.8792C6.33375 33.8153 8.406 33.7163 11.2365 33.75H22.5V31.5H11.25C8.415 31.4662 6.55425 31.365 5.73075 30.9105C5.31675 30.6855 5.07825 30.4335 4.86 29.8485C4.64175 29.2635 4.5 28.332 4.5 27V15.75C4.5 14.418 4.64175 13.4865 4.86 12.9015C5.0805 12.3165 5.31675 12.0668 5.73075 11.8395C6.5565 11.3828 8.4195 11.2837 11.2635 11.25H24.75C27.585 11.2837 29.4457 11.385 30.2693 11.8395C30.6833 12.0645 30.9218 12.3165 31.14 12.9015C31.3582 13.4865 31.5 15.75 31.5 15.75V22.5H33.75V9C33.75 7.5195 33.615 6.34725 33.2437 5.36175C32.9036 4.41275 32.2358 3.61643 31.3605 3.11625C29.6663 2.18025 27.594 2.28375 24.7635 2.25H24.75V4.5H22.5V2.25H13.5ZM22.5 2.25H24.75V0L22.5 0.5625V2.25ZM29.25 24.75V29.25H24.75V31.5H29.25V36H31.5V31.5H36V29.25H31.5V24.75H29.25Z"
                      fill="#B63B6E"
                    />
                  </svg>

                  <div className={styles.cardMiddle}>
                    <p>Total Appointments</p>
                    <h3>{Number(data?.appointmentCount).toFixed(2)}</h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp style={{ color: "#08090A" }} />{" "}
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
