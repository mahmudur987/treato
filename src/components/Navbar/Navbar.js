import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import mask from "../../assets/images/NavbarImages/Mask.webp";
import mask2 from "../../assets/images/NavbarImages/Mask2.webp";
import icon1 from "../../assets/svgs/icon (12).svg";
import icon2 from "../../assets/svgs/icon (13).svg";
import {
  TreatoLogo,
  accountSetting,
  briefcase,
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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // change to false to see guest mode
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Dummy user data for static mode
  const userInfo = {
    first_name: "John",
    email: "john@example.com",
    avatar: { public_url: "" },
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDesktopMenuToggle = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDesktopMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  // Close menu on outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={menuRef}
      className={`${styles.header} ${
        isMobileMenuOpen ? `${styles.menuopen} ${styles.whiteBackground}` : ""
      } page-section`}
    >
      <div className={styles.container}>
        {/* Left side navbar */}
        <div className={styles.navWrapper}>
          <nav className={styles.navigation}>
            <ul>
              <li className={styles.logo}>
                <Link to="/">
                  <img loading="lazy" src={TreatoLogo} alt="TreatoLogo" />
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

        {/* Right side buttons */}
        <div className={styles.buttons}>
          <button
            className={styles.menuButton}
            ref={buttonRef}
            onClick={handleMobileMenuToggle}
          >
            {!isMobileMenuOpen ? (
              <img
                loading="lazy"
                src={
                  isLoggedIn ? userInfo?.avatar?.public_url || mask : menuLogo
                }
                alt="menuLogo"
              />
            ) : (
              <img loading="lazy" src={x} alt="closeIcon" />
            )}
          </button>

          <Link to={"/partner"}>
            <SecondaryButton className={styles.partnerButton}>
              Become a partner
            </SecondaryButton>
          </Link>

          {!isLoggedIn ? (
            <PrimaryButton
              className={styles.signupButton}
              onClick={() => navigate("/auth-choice")}
            >
              Sign up
            </PrimaryButton>
          ) : (
            <SecondaryButton
              className={`${styles.signinButton} ${styles.hideOnMobile}`}
              onClick={handleDesktopMenuToggle}
            >
              <img
                loading="lazy"
                src={userInfo?.avatar?.public_url || mask}
                alt="mask"
              />
              {userInfo?.first_name}
              {isDesktopMenuOpen ? (
                <img src={icon1} alt="chevron" />
              ) : (
                <img src={icon2} alt="chevron" />
              )}
            </SecondaryButton>
          )}
        </div>
      </div>

      {/* Mobile nav bar */}
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
                    loading="lazy"
                    src={userInfo?.avatar?.public_url || mask2}
                    alt="mask"
                  />
                  <h3 className={styles.userName}>{userInfo?.first_name}</h3>
                  <small className={styles.userEmail}>{userInfo?.email}</small>
                </div>

                <li>
                  <Link to="/my-appointments/upcoming">
                    <div className={styles.listtext}>
                      <img loading="lazy" src={history} alt="history" />
                      My Appointments
                      <span className={styles.unSeenCounter}>2</span>
                    </div>
                    <div className={styles.chevronright}>
                      <img loading="lazy" src={chevronright} alt="chevron" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/account-settings">
                    <div className={styles.listtext}>
                      <img
                        loading="lazy"
                        src={accountSetting}
                        alt="accountSetting"
                      />
                      Account Settings
                    </div>
                    <div className={styles.chevronright}>
                      <img loading="lazy" src={chevronright} alt="chevron" />
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
                    <img loading="lazy" src={signin} alt="signin" />
                    Sign up / Sign-in
                  </div>
                  <div className={styles.chevronright}>
                    <img loading="lazy" src={chevronright} alt="chevron" />
                  </div>
                </a>
              </li>
            )}

            <li>
              <Link to={"/blogs"} onClick={() => setIsMobileMenuOpen(false)}>
                <div className={styles.listtext}>
                  <img loading="lazy" src={notetext} alt="notetext" />
                  Blog
                </div>
                <div className={styles.chevronright}>
                  <img loading="lazy" src={chevronright} alt="chevron" />
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/lookbook"}>
                <div className={styles.listtext}>
                  <img loading="lazy" src={lookbookIcon} alt="lookbook" />
                  Lookbook
                </div>
                <div className={styles.chevronright}>
                  <img loading="lazy" src={chevronright} alt="chevron" />
                </div>
              </Link>
            </li>
            <li>
              <div className={styles.listtext}>
                <img loading="lazy" src={briefcase} alt="briefcase" />
                Become a partner
              </div>
            </li>
            <li>
              <div className={styles.listtext}>
                <img loading="lazy" src={download} alt="download" />
                Download app
              </div>
            </li>

            {isLoggedIn && (
              <li>
                <div
                  className={`${styles.listtext} ${styles.signout}`}
                  onClick={handleLogout}
                >
                  <img loading="lazy" src={signout} alt="signout" />
                  Signout
                </div>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
