import React, { useState } from "react";
import styles from "./ServicePageNavbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUserDetails, updateIsLoggedIn } from "../../../redux/slices/user";
const ServicePageNavbar = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    dispatch(updateIsLoggedIn(false));
    dispatch(resetUserDetails({}));
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    navigate("/partner");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.actionWrapper}>
          {userData?.isLoggedIn && (
            <div
              className={styles.account}
              onClick={() => setShowProfile((pre) => !pre)}
            >
              <img src={userData?.user?.avatar?.public_url} alt="" />
              <h3>{userData?.user?.first_name}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </p>
        {showProfile && (
          <div
            onClick={() => setShowProfile((pre) => !pre)}
            className={styles.profileContainer}
          >
            <img src={userData?.user?.avatar?.public_url} alt="" />
            <h3>{userData?.user?.first_name}</h3>
            <Link to={"/service"}>servicess</Link>
            <Link onClick={handleLogout}>LogOut</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePageNavbar;
