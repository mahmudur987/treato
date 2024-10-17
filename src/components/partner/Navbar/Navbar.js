import React, { useState, useCallback } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails, updateIsLoggedIn } from "../../../redux/slices/user";
import TreatoLogo from "../../../assets/images/icons/TreatoLogo.svg";
import TreatoLogo2 from "../../../assets/images/partner/Treato2.webp";
import menu from "../../../assets/icons/menu.webp";
import signin from "../../../assets/icons/partner/signin.webp";
import cross from "../../../assets/icons/partner/cross.webp";
import right from "../../../assets/icons/partner/chevron-right.webp";
import userIcon from "../../../assets/icons/partner/user.webp";
import pricing from "../../../assets/icons/partner/price.webp";
import download from "../../../assets/icons/partner/download.webp";
import mask from "../../../assets/images/NavbarImages/Mask.webp";
import icon from "../../../assets/svgs/icon (14).svg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(updateIsLoggedIn(false));
    dispatch(resetUserDetails({}));
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    navigate("/partner");
  }, [dispatch, navigate]);

  const scrollToSection = useCallback(
    (navigate, sectionId) => {
      navigate("/partner");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 50,
            behavior: "smooth",
          });
        }
      }, 450);
    },
    [navigate]
  );

  const renderMobileMenu = () => (
    <div className={style.mobileMenuContainer}>
      <div className={style.mobileMenuHeader}>
        <Link to={"/"} className={style.siteName}>
          <img loading="lazy" src={TreatoLogo} alt="Treato" />
        </Link>
        <button onClick={() => setShow((prev) => !prev)}>
          <img loading="lazy" src={cross} alt="Close" />
        </button>
      </div>
      <div className={style.mobileMenuItems}>
        <MenuItem
          linkTo="/partner/authchoice"
          icon={signin}
          label="Sign up / Sign-in"
        />
        <MenuItem linkTo="/" icon={userIcon} label="For Customers" />
        <MenuItem linkTo="#" icon={pricing} label="Pricing" />
        <MenuItem linkTo="/" icon={download} label="Download App" />
        {userData.user.role === "partner" && (
          <MenuItem
            linkTo="/partner/dashboard"
            icon={userIcon}
            label="Dashboard"
          />
        )}
      </div>
    </div>
  );

  return (
    <section className={style.mainContainer}>
      <header className={style.container}>
        <nav className={style.siteNameWrapper}>
          <Link to={"/"} className={style.siteName}>
            <img loading="lazy" src={TreatoLogo} alt="Treato" />
          </Link>
        </nav>
        <nav className={style.navMenu}>
          <p className={style.navItems}>
            <Link to="/" className={style.navItem}>
              For customers
            </Link>
            <Link
              onClick={() => scrollToSection(navigate, "AppDownload")}
              className={style.navItem}
            >
              Download App
            </Link>
            <Link to="/" className={style.navItem}>
              Pricing
            </Link>
          </p>
          <p className={style.actionWrapper}>
            {userData?.isLoggedIn ? (
              <div
                onClick={() => setShowProfile((prev) => !prev)}
                className={style.account}
              >
                <img
                  loading="lazy"
                  src={userData?.user?.avatar?.public_url ?? ""}
                  alt="User Avatar"
                  onError={(e) => (e.target.src = mask)}
                />
                <h3>{userData?.user?.first_name}</h3>
                <img src={icon} alt="Dropdown" />
              </div>
            ) : (
              <div className={style.action}>
                <Link to="/partner/login">
                  <button className={style.login}>Login</button>
                </Link>
                <Link to="/partner/authchoice">
                  <button className={style.signup}>Sign up for free</button>
                </Link>
              </div>
            )}
          </p>
        </nav>

        {showProfile && (
          <div
            onClick={() => setShowProfile((prev) => !prev)}
            className={style.profileContainer}
          >
            <img
              loading="lazy"
              src={userData?.user?.avatar?.public_url ?? ""}
              alt="User Avatar"
              onError={(e) => (e.target.src = mask)}
            />
            <h3>{userData?.user?.first_name}</h3>
            {userData.user.role === "partner" && (
              <Link to="/partner/dashboard">Dashboard</Link>
            )}
            <Link onClick={handleLogout}>LogOut</Link>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={style.mobileMenu}>
          <Link to="/" className={style.siteName}>
            <img
              loading="lazy"
              src={TreatoLogo2}
              className={style.TreatoLogo2}
              alt="Treato"
            />
          </Link>
          <button onClick={() => setShow((prev) => !prev)}>
            <img
              loading="lazy"
              className={style.hamburger}
              src={menu}
              alt="Menu"
            />
          </button>
          {show && renderMobileMenu()}
        </div>
      </header>
    </section>
  );
};

// Extracted Mobile Menu Item component for reusability
const MenuItem = ({ linkTo, icon, label }) => (
  <div className={style.mobileMenuItem}>
    <Link to={linkTo}>
      <img loading="lazy" src={icon} alt={label} /> <span>{label}</span>
    </Link>
    <button>
      <img loading="lazy" src={right} alt="Next" />
    </button>
  </div>
);

export default Navbar;
