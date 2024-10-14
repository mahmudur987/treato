import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { IoIosArrowUp } from "@react-icons/all-files/io/IoIosArrowUp";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
import Slider from "react-slick";
import cardLeft from "../../../../../assets/svgs/icon (3).svg";
import cardMiddle from "../../../../../assets/svgs/icon (4).svg";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { FaPen } from "@react-icons/all-files/fa/FaPen";
import { useCommissionStatistics } from "../../../../../services/superAdmin/Commission";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";

const Header = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef(null);
  const [comm, setComm] = useState("");

  const { data, isLoading, isError, error, refetch } =
    useCommissionStatistics(selectedOption);

  // console.log(data?.commissionDetails);
  const {
    commPercentage,
    totalAppointments,
    appointmentsAfterStartDate,
    appointmentChange,
    appointmentPercentageChange,
    totalCommission,
    commissionAfterStartDate,
    commPercentageChange,
  } = data?.commissionDetails || {};
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
  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
    setComm(commPercentage);
  }, [isEditable, data]);

  const handleUpdateComm = async () => {
    const data = {
      commPercentage: comm,
    };
    const token = localStorage.getItem("jwtToken");
    const headers = { token };

    try {
      const res = await axiosInstance.patch("super/updatecommission", data, {
        headers,
      });

      console.log(res);

      if (res?.data) {
        toast.success("Commission updated successfully.");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "An error occurred while updating the commission."
      );
    }
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <span>
          <IoMdArrowBack />
        </span>
        <h1 className={styles.heading}>Commission</h1>
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
              <div className={styles.card}>
                <div className={styles.cardLeft}>
                  <FaUsers className={styles.faUser} />
                  <div className={styles.cardMiddle}>
                    <p>Commission %</p>
                    <h3>
                      {isEditable ? (
                        <input
                          type="text"
                          placeholder={commPercentage}
                          ref={inputRef}
                          onChange={(e) => setComm(e.target.value)}
                        />
                      ) : (
                        <span>{commPercentage ?? "N/A"}</span>
                      )}
                    </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <button onClick={() => setIsEditable((pre) => !pre)}>
                    <span>
                      <FaPen className={styles.faPen} />
                    </span>
                    {isEditable ? (
                      <span onClick={handleUpdateComm}>Done</span>
                    ) : (
                      <span>Edit</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* average sale  */}
            <div>
              <div className={`${styles.card} ${styles.bgCard}`}>
                <div className={styles.cardLeft}>
                  <img src={cardLeft} alt="down arrow" />

                  <div className={styles.cardMiddle}>
                    <p>Commission Earned</p>

                    <h3>₹{Number(totalCommission).toFixed(2)} </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp className={styles.arrowUp} /> ₹
                  {commissionAfterStartDate}({commissionAfterStartDate})
                </div>
              </div>
            </div>

            {/* total appointments */}

            <div>
              <div className={`${styles.card} ${styles.bgCard1}`}>
                <div className={styles.cardLeft}>
                  <img src={cardMiddle} alt="down arrow" />

                  <div className={styles.cardMiddle}>
                    <p>Total Appointments</p>
                    <h3>
                      {Number(
                        data?.commissionDetails?.totalAppointments
                      ).toFixed(2)}
                    </h3>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <IoIosArrowUp className={styles.arrowUp} />{" "}
                  {Number(
                    data?.commissionDetails?.appointmentsAfterStartDate
                  ).toFixed(2)}
                  (
                  {Number(
                    data?.commissionDetails?.appointmentPercentageChange
                  ).toFixed(2)}{" "}
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
