import React, { useState, useEffect, useRef } from "react";
import styles from "./ServicePageNavbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUserDetails, updateIsLoggedIn } from "../../../redux/slices/user";
import mask from "../../../assets/images/NavbarImages/Mask.png";
// import mask from "../../../assets/images/NavbarImages/Mask.png";
const ServicePageNavbar = () => {
  const [isToggled, setIsToggled] = useState(true);
  const toggleRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setIsToggled(true);
        setShowProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <div ref={toggleRef} className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.actionWrapper}>
          {userData?.isLoggedIn && (
            <div
              className={styles.account}
              onClick={() => setShowProfile((pre) => !pre)}
            >
              <img
                src={userData?.user?.avatar?.public_url ?? ""}
                onError={(e) => (e.target.src = mask)}
                alt=""
              />
              <h3>{userData?.user?.first_name}</h3>
              {isToggled ? <svg
                onClick={handleToggle}
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
              </svg> : <svg 
              onClick={handleToggle}
              xmlns="http://www.w3.org/2000/svg"
               width="24"
                height="24" 
                fill="none"
                 id="up-arrow">
                  <path fill="#000" fill-rule="evenodd" d="M5.306 15.694a1.043 1.043 0 0 0 1.476 0L12 10.47l5.218 5.224a1.043 1.043 0 0 0 1.476 0 1.046 1.046 0 0 0 0-1.478l-5.904-5.91a1.04 1.04 0 0 0-.79-.305 1.04 1.04 0 0 0-.79.305l-5.904 5.91a1.046 1.046 0 0 0 0 1.478Z" clip-rule="evenodd"></path></svg>}

            </div>
          )}
        </p>
        {showProfile && (
          <div
            onClick={() => setShowProfile((pre) => !pre)}
            className={styles.profileContainer}
          >
            <img
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

export default ServicePageNavbar;
