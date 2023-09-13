import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mask2 from "../../assets/images/NavbarImages/Mask2.png";
import mask from "../../assets/images/NavbarImages/Mask.png";
import MainSearchBar from "../Input/mainSearchBar/MainSearchBar";
import {
  TreatoLogo,
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
  supportIcon,
  x,
} from "../../assets/images/icons";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMainSearchBar, setisMainSearchBar] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleDesktopMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  useEffect(() => {
    if (location.pathname === "/salons") {
      setisMainSearchBar(true);
    } else {
      setisMainSearchBar(false);
    }
  }, [location.pathname]);

  return (
    <header
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
              {!isMainSearchBar && (
                <>
                  <li>
                    <Link to="/blogs/1">Blog</Link>
                  </li>
                  <li>
                    <Link to="#">Lookbook</Link>
                  </li>
                  <li onClick={() => scrollToSection(navigate, "contactUs")}>
                    <Link to="#">Contact us</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        {/* search bar */}
        {isMainSearchBar && <MainSearchBar place={"navbar"} />}

        {/* rightSide buttons */}
        <div className={styles.buttons}>
          <button
            className={styles.menuButton}
            onClick={handleMobileMenuToggle}
          >
            {!isMobileMenuOpen ? (
              <img src={menuLogo} alt="menuLogo" />
            ) : (
              <img src={x} alt="closeIcon" />
            )}
          </button>
          <SecondaryButton
            className={styles.partnerButton}
            onClick={() => scrollToSection(navigate, "partnerSection")}
            children={"Become a partner"}
          />
          {!isLoggedIn ? (
            <PrimaryButton
              children={"Sign up"}
              className={styles.signupButton}
            />
          ) : (
            <SecondaryButton
              className={styles.signinButton}
              onClick={handleDesktopMenuToggle}
            >
              <img src={mask} alt="mask" />
              Shreya
              <img src={chevrondown} alt="chevrondown" />
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
                  <img src={mask2} alt="mask" />
                  <h3 className={styles.userName}>Shreya Avasthi</h3>
                  <small className={styles.userEmail}>
                    shreya2716@gmail.com
                  </small>
                </div>

                <li>
                  <a href="/my-appointments/upcoming">
                    <div className={styles.listtext}>
                      <img src={history} alt="history" />
                      My Appointments
                      <span className={styles.unSeenCounter}>1</span>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.listtext}>
                      <img src={signin} alt="signin" />
                      <a href="#">Account Setting</a>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>

                <hr />
              </>
            )}

            {!isLoggedIn && (
              <li>
                <a href="/create-account">
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
                  <a href="/blogs/1">
                    <div className={styles.listtext}>
                      <img src={notetext} alt="notetext" />
                      Blog
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>
                <li>
                  <div className={styles.listtext}>
                    <img src={lookbookIcon} alt="lookbookIcon" />
                    Lookbook
                  </div>
                  <div className={styles.chevronright}>
                    <img src={chevronright} alt="chevronright" />
                  </div>
                </li>
                <li onClick={() => scrollToSection(navigate, "partnerSection")}>
                  <div className={styles.listtext}>
                    <img src={briefcase} alt="briefcase" />
                    Become a partner
                  </div>
                  <div className={styles.chevronright}>
                    <img src={chevronright} alt="chevronright" />
                  </div>
                </li>
                <li>
                  <a href="/">
                    <div className={styles.listtext}>
                      <img src={download} alt="download" />
                      Download app
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <div className={styles.listtext}>
                      <img src={supportIcon} alt="supportIcon" />
                      Help & Support
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} alt="chevronright" />
                    </div>
                  </a>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <a href="/login">
                  <div className={`${styles.listtext} ${styles.signout}`}>
                    <img src={signout} alt="signout" />
                    signout
                  </div>
                  <div className={styles.chevronright}>
                    <img src={chevronright} alt="chevronright" />
                  </div>
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
