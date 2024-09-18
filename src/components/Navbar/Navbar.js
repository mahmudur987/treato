import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mask2 from "../../assets/images/NavbarImages/Mask2.png";
import mask from "../../assets/images/NavbarImages/Mask.png";
import MainSearchBar from "../Input/mainSearchBar/MainSearchBar";
import {
  TreatoLogo,
  accountSetting,
  briefcase,
  chevrondown,
  chevronright,
  download,
  history,
  lookbookIcon,
  menuLogo,
  notetext,
  signin,
  signout,
  x,
} from "../../assets/images/icons";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails, updateIsLoggedIn } from "../../redux/slices/user";
import { useUpcomingApponments } from "../../services/Appointments";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMainSearchBar, setisMainSearchBar] = useState(false);
  const [resetUserData, setresetUserData] = useState({});
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data } = useUpcomingApponments();
  const count = data?.res?.data?.data.length;
  const menuRef = useRef(null); // Ref for the menu
  const buttonRef = useRef(null);
  // Using to scroll to a particular section
  const scrollToSection = (navigate, sectionId) => {
    navigate("/"); // Navigate to the home page
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }, 450); // Delay the scroll to ensure the navigation has completed
  };

  //To toggle top right menubar
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleDesktopMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  //Logout
  const handleLogout = () => {
    dispatch(updateIsLoggedIn(false));
    dispatch(resetUserDetails(resetUserData));
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    setIsDesktopMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
    setIsLoggedIn(false);
    setuserInfo("");
    // window.open("https://backend.treato.in/api/v1/auth/logout","_self")
  };

  useEffect(() => {
    if (location.pathname === "/salons") {
      setisMainSearchBar(true);
    } else {
      setisMainSearchBar(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    if (userData.isLoggedIn) {
      setIsLoggedIn(true);
      setuserInfo(userData.user);
    }
  }, [userData.isLoggedIn, userData.user]);
  // Add a useEffect to close menus when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        ref={menuRef}
        className={`${styles.header} ${
          isMobileMenuOpen ? `${styles.menuopen} ${styles.whiteBackground}` : ""
        } page-section`}
      >
        <div className={styles.container}>
          {/* leftSide navbar */}
          <div
            className={`${
              isMainSearchBar ? styles.navWrapper_search : styles.navWrapper
            }`}
          >
            <nav className={styles.navigation}>
              <ul>
                <li className={styles.logo}>
                  <Link to="/">
                    <img src={TreatoLogo} alt="TreatoLogo" />
                  </Link>
                </li>

                <li>
                  <Link to="/blogs">Blog</Link>
                </li>
                <li>
                  <Link to="/lookbook">Lookbook</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact us</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* search bar */}

          {/* {isMainSearchBar && <MainSearchBar/>} */}
          {/* rightSide buttons */}
          <div className={styles.buttons}>
            <button
              className={styles.menuButton}
              ref={buttonRef}
              onClick={handleMobileMenuToggle}
            >
              {!isMobileMenuOpen ? (
                <img
                  src={
                    isLoggedIn
                      ? userInfo?.avatar?.public_url
                        ? userInfo?.avatar?.public_url
                        : mask
                      : menuLogo
                  }
                  alt="menuLogo"
                />
              ) : (
                <img src={x} alt="closeIcon" />
              )}
            </button>
            <Link to={"/partner"}>
              <SecondaryButton
                className={styles.partnerButton}
                onClick={() => scrollToSection(navigate, "partnerSection")}
                children={"Become a partner"}
              />
            </Link>
            {!isLoggedIn ? (
              <PrimaryButton
                children={"Sign up"}
                className={styles.signupButton}
                onClick={() => navigate("/auth-choice")}
              />
            ) : (
              <SecondaryButton
                className={`${styles.signinButton} ${styles.hideOnMobile}`}
                onClick={handleDesktopMenuToggle}
              >
                <img
                  src={userInfo?.avatar?.public_url || mask}
                  alt="mask"
                  onError={(e) => {
                    e.target.src = mask;
                  }}
                />
                {userInfo?.first_name}
                {isDesktopMenuOpen ? (
                  <svg
                    className={`${styles.chevrondown} w-6 h-6 text-gray-800 dark:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m5 15 7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`${styles.chevrondown} w-6 h-6 text-gray-800 dark:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                )}
              </SecondaryButton>
            )}
          </div>
        </div>

        {/* mobile nav bar */}
        {isMobileMenuOpen && (
          <nav
            className={`${styles.mobileNavDropBox} ${
              isDesktopMenuOpen ? styles.deskDropBox : ""
            }`}
          >
            <ul>
              {isLoggedIn && (
                <>
                  <div className={styles.navUserInfo}>
                    <img
                      src={
                        userInfo?.avatar?.public_url
                          ? userInfo?.avatar?.public_url
                          : mask2
                      }
                      alt="mask"
                    />
                    <h3 className={styles.userName}>{userInfo?.first_name}</h3>
                    <small className={styles.userEmail}>
                      {userInfo?.email}
                    </small>
                  </div>

                  <li>
                    <Link to="/my-appointments/upcoming">
                      <div className={styles.listtext}>
                        <img src={history} alt="history" />
                        My Appointments
                        {count > 0 && (
                          <span className={styles.unSeenCounter}>{count}</span>
                        )}
                      </div>
                      <div className={styles.chevronright}>
                        <img src={chevronright} alt="chevronright" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account-settings">
                      <div className={styles.listtext}>
                        <img src={accountSetting} alt="signin" />
                        <a href="#">Account Settings</a>
                      </div>
                      <div className={styles.chevronright}>
                        <img src={chevronright} alt="chevronright" />
                      </div>
                    </Link>
                  </li>

                  <hr className={styles.divideLine} />
                </>
              )}

              {!isLoggedIn && (
                <li>
                  <a href="/auth-choice">
                    <div className={styles.listtext}>
                      <img src={signin} alt="signin" />
                      Sign up / Sign-in
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>
              )}
              {!isDesktopMenuOpen && (
                <>
                  <li>
                    <Link
                      to={"/blogs"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={styles.listtext}>
                        <img src={notetext} alt="notetext" />
                        Blog
                      </div>
                      <div className={styles.chevronright}>
                        <img src={chevronright} alt="chevronright" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/lookbook"}>
                      <div className={styles.listtext}>
                        <img src={lookbookIcon} alt="lookbookIcon" />
                        Lookbook
                      </div>
                      <div className={styles.chevronright}>
                        <img src={chevronright} alt="chevronright" />
                      </div>
                    </Link>
                  </li>

                  <li
                    onClick={() => scrollToSection(navigate, "partnerSection")}
                  >
                    <div className={styles.listtext}>
                      <img src={briefcase} alt="briefcase" />
                      Become a partner
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </li>
                  <li onClick={() => scrollToSection(navigate, "AppDownload")}>
                    <div className={styles.listtext}>
                      <img src={download} alt="download" />
                      Download app
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li>
                  <a href="#">
                    <div
                      className={`${styles.listtext} ${styles.signout}`}
                      onClick={handleLogout}
                    >
                      <img src={signout} alt="signout" />
                      Signout
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
