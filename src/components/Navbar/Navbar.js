import React, { useState,useEffect } from "react";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import mask2 from "../../assets/images/NavbarImages/Mask2.png";
import mask from "../../assets/images/NavbarImages/Mask.png";
import MainSearchBar from "../Input/mainSearchBar/MainSearchBar";
import { TreatoLogo, briefcase, chevrondown, chevronright, download, history, menuLogo, notetext, signin, signout, x } from "../../assets/images/icons";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMainSearchBar, setisMainSearchBar] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    }
    else{
      setisMainSearchBar(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={`${styles.header} ${isMobileMenuOpen ? styles.menuopen : ""} page-section`}
    >
      <div className={styles.container}>
        <div className={`${isMainSearchBar?styles.navWrapper_search:styles.navWrapper}`}>
          <nav className={styles.navigation}>
            <ul>
              <li className={styles.logo}>
                <a href="/">
                  <img src={TreatoLogo} />
                </a>
              </li>
              {!isMainSearchBar && (
                <>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Lookbook</a>
                  </li>
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {isMainSearchBar && <MainSearchBar place={"navbar"} />}

        <div className={styles.buttons}>
          <button
            className={styles.menuButton}
            onClick={handleMobileMenuToggle}
          >
            {!isMobileMenuOpen ? <img src={menuLogo} /> : <img src={x} />}
          </button>
          <button className={styles.partnerButton}>Become a partner</button>
          {!isLoggedIn ? (
            <button className={styles.signupButton}>Sign up</button>
          ) : (
            <button
              className={styles.signinButton}
              onClick={handleDesktopMenuToggle}
            >
              <img src={mask} alt="mask" />
              Shreya
              <img src={chevrondown} alt="chevrondown" />
            </button>
          )}
        </div>
      </div>

      {/* Profile dropBox */}
      {isMobileMenuOpen && (
        <nav
          //   className={styles.mobileNavDropBox}
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
                  <a href="#">
                    <div className={styles.listtext}>
                      <img src={history} alt="history" />
                      <a href="/my-appointments/upcoming">Appointment History</a>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} slt="chevronright" />
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
                      <img src={chevronright} slt="chevronright" />
                    </div>
                  </a>
                </li>

                <hr />
              </>
            )}

            {!isLoggedIn && (
              <li>
                <a href="#">
                  <div className={styles.listtext}>
                    <img src={signin} alt="signin" />
                    <a href="#">Sign Up / Sign In</a>
                  </div>
                  <div className={styles.chevronright}>
                    <img src={chevronright} slt="chevronright" />
                  </div>
                </a>
              </li>
            )}
            {!isDesktopMenuOpen && (
              <>
                <li>
                  <a>
                    <div className={styles.listtext}>
                      <img src={briefcase} alt="briefcase" />
                      <a href="#">Become a Partner</a>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} slt="chevronright" />
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <div className={styles.listtext}>
                      <img src={notetext} alt="notetext" />
                      <a href="#">Blog</a>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} slt="chevronright" />
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <div className={styles.listtext}>
                      <img src={download} alt="download" />
                      <a href="#">Download app</a>
                    </div>
                    <div className={styles.chevronright}>
                      <img src={chevronright} slt="chevronright" />
                    </div>
                  </a>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <a href="#">
                  <div className={styles.listtext}>
                    <img src={signout} alt="signout" />
                    <a href="#" className={styles.signout}>
                      signout
                    </a>
                  </div>
                  <div className={styles.chevronright}>
                    <img src={chevronright} slt="chevronright" />
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
