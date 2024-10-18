import React, { useEffect, useRef, useState } from "react";
import styles from "./ServicePageNavbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import user, {
  resetUserDetails,
  updateIsLoggedIn,
} from "../../../redux/slices/user";
import mask from "../../../assets/images/NavbarImages/Mask.webp";
import icon from "../../../assets/svgs/icon (1).svg";

export const downArrow = icon;
const ServicePageNavbar = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();
  const handleLogout = () => {
    dispatch(updateIsLoggedIn(false));
    dispatch(resetUserDetails({}));
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    navigate("/partner");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);
  return (
    <div ref={profileRef} className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.actionWrapper}>
          {userData?.isLoggedIn && (
            <div
              className={styles.account}
              onClick={() => setShowProfile((pre) => !pre)}
            >
              <img
                loading="lazy"
                src={userData?.user?.avatar?.public_url ?? ""}
                onError={(e) => (e.target.src = mask)}
                alt=""
              />
              <h3>{userData?.user?.first_name}</h3>
              <img src={downArrow} alt="" />
            </div>
          )}
        </div>
        {showProfile && (
          <div
            onClick={() => setShowProfile((pre) => !pre)}
            className={styles.profileContainer}
          >
            <img
              loading="lazy"
              src={userData?.user?.avatar?.public_url ?? ""}
              onError={(e) => (e.target.src = mask)}
              alt=""
              className="profile"
            />
            <h3>{userData?.user?.first_name}</h3>
            {userData.user.role === "partner" && (
              <Link to={"/partner/dashboard"}>Dashboard</Link>
            )}
            <Link onClick={handleLogout}>LogOut</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePageNavbar;
