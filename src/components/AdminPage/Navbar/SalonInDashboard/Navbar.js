import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetUserDetails,
  updateIsLoggedIn,
} from "../../../../redux/slices/user";
import mask from "../../../../assets/images/NavbarImages/Mask.webp";
import { CiSearch } from "react-icons/ci";
import { updateSearchText } from "../../../../redux/slices/AdminSlice";
import img1 from "../../../../assets/svgs/icon (10).svg";
const SalonInDashboardNavbar = () => {
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
        <p className={styles.searchWrapper}>
          <label htmlFor="salonSearch">
            <CiSearch />
          </label>
          <input
            type="text"
            name="salonSearch"
            id="salonSearch"
            placeholder="Search Salons"
            onChange={(e) =>
              dispatch(updateSearchText({ searchText: e.target.value }))
            }
          />
        </p>

        <p className={styles.actionWrapper}>
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
              <img src={img1} alt="" />
            </div>
          )}
        </p>
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

export default SalonInDashboardNavbar;
